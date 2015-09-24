PdiContatosPropostas = new Mongo.Collection('pdiContatosPropostas');

PdiContatosPropostas.findOrCreate = function(obj){
    var contatoId, contato = this.findOne(obj);

    if (!contato) {
        contatoId = this.insert(obj);
        contato = this.findOne(contatoId);
    }

    return contato;
}

Meteor.methods({
    enviarContatoProposta: function(contato){
        var hipchat;

        if (Meteor.isServer)
            hipchat = new HipChatNotify();

        PdiContatoPropostaSchema.clean(contato, {removeEmptyStrings: true});

        check(contato, PdiContatoPropostaSchema);

        var contato = PdiContatosPropostas.findOrCreate(contato);

        if (hipchat)
            hipchat.info(EJSON.stringify(contato));

        //enviarEmailConfirmacao(contato);

        return contato;
    },
    atualizarContatoPropostas: function(propostas, contatoId){
        check(propostas, [String]);
        check(contatoId, String);

        cond = {$or:[]};

        _.each(propostas, function(id){
            cond.$or.push({_id: id});
        });

        //console.log('atualizou contatos de propostas!');

        return PdiPropostas.update(cond, {$set: {contatoId: contatoId}}, {multi: true});
    }
});

function enviarEmailConfirmacao(contato){

    var html = SSR.render('emailConfirmacaoRecebimentoProposta', contato);

    //console.log(html);
    //return;

    Email.send({
        from: "PDI - UERN <dinf.informa@uern.br>",
        to: contato.email,
        subject: "Confirmação de recebimento",
        html: html
    });
}