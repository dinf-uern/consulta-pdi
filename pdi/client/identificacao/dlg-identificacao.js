Template.dlgIdentificacao.onCreated(function(){
    this.validator = PdiContatoPropostaSchema.namedContext('contatoPropostaContext');
});

Template.dlgIdentificacao.helpers({
    relacoesArr: function(){
        return [
            {cod:'professor', titulo: 'Professor'},
            {cod:'tecnico', titulo: 'Técnico'},
            {cod:'aluno', titulo: 'Aluno'},
            {cod:'outros', titulo: 'Outros'}
        ];
    },
    errorMessage: function(field) {
        return Template.instance().validator.keyErrorMessage(field);
    },
    errorClass: function(field) {
        return !!Template.instance().validator.keyErrorMessage(field)?'has-error':'';
    }
});

Template.dlgIdentificacao.events({
    'click .btn-salvar': function(event, template){
        event.preventDefault();

        var contato = {};

        contato.relacao = template.$('#inputRelacao').val();
        contato.nome = template.$('#inputNome').val();
        contato.email = template.$('#inputEmail').val();

        PdiContatoPropostaSchema.clean(contato, {removeEmptyStrings: true});

        if (!template.validator.validate(contato, {}))
            return;

        Meteor.call('enviarContatoProposta', contato, function(err, contato) {
            if (err)
                return toastr.error(err.reason);

            toastr.success('Informações para contato recebidas com sucesso!');
            Session.set('informacoesContato', contato);


            var propostasEnviadas = Session.get('propostasEnviadasSemContato');

            if (propostasEnviadas && propostasEnviadas.length > 0) {
                Meteor.call('atualizarContatoPropostas', propostasEnviadas, contato._id, function(err, data){
                    if (err)
                        return toastr.error(err.reason);

                    Session.set('propostasEnviadasSemContato', []);
                });
            }

            Modal.hide();
        });

    }
});