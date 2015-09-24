Template.enviarPropostaInclusaoMetas.onCreated(function(){
    this.validator = PdiPropostaInclusaoMetasSchema.namedContext('pdiPropostaInclusaoMetasContext');
    Session.set('requestContato', false);
    Session.set('subtopicoAtualId', null);
    Session.set('diretrizSelecionadaId', null);
    Session.set('metaSelecionadaId', null);
    Session.set('metas', null);
});

Template.enviarPropostaInclusaoMetas.helpers({
    errorMessages: function(){
        var invalidKeys = Template.instance().validator.invalidKeys();
        var errorMessages = _.map(invalidKeys, function(error){
            return Template.instance().validator.keyErrorMessage(error.name);
        });
        //console.log(errorMessages);
        return errorMessages;
    }
});

Template.enviarPropostaInclusaoMetas.events({
    'submit': function(event, template){
        event.preventDefault();
        var informacoesContato = Session.get('informacoesContato');

        var proposta = {};
        proposta.tipo = 'inclusao';
        proposta.subtipo = 'metas';
        proposta.nodeId = Session.get('diretrizSelecionadaId');
        proposta.topicoId = template.$('#inputTopico').val();
        proposta.subtopicoId = Session.get('subtopicoAtualId');
        proposta.diretrizId = Session.get('diretrizSelecionadaId');
        proposta.metas = cloneAndClear(this.metas.get());

        //console.log(proposta);

        PdiPropostaInclusaoMetasSchema.clean(proposta);

        if (!template.validator.validate(proposta))
            return;

        Meteor.call('enviarPropostaInclusao', proposta, function(err, propostaId){
            if (err)
                return toastr.error(err.reason);

            toastr.success('Proposta recebida com sucesso!');

            if (informacoesContato) {
                Meteor.call('atualizarContatoPropostas', [propostaId], informacoesContato._id);
            } else {
                var propostasEnviadas = Session.get('propostasEnviadasSemContato');

                if (!propostasEnviadas)
                    propostasEnviadas = [];

                propostasEnviadas.push(propostaId);
                Session.set('propostasEnviadasSemContato', propostasEnviadas);

                Session.set('requestContato', true);
            }

            Router.go('verEstatisticas');

        });
    }
});

function cloneAndClear(metas){
    var arr = [];
    _.each(metas, function(meta){
        arr.push({texto:meta.texto, acoes: _.clone(meta.acoes.get())});
    });
    return arr;
}

function limparAcoes(meta){
    meta.acoes = _.clone(meta.acoes.get());
    return meta;
}


Template.enviarPropostaInclusaoMetas.onDestroyed(function(){
    //Session.set('requestContato', false);
});