Template.enviarPropostaInclusaoAcoes.onCreated(function(){
    this.validator = PdiPropostaInclusaoAcoesSchema.namedContext('pdiPropostaInclusaoAcoesContext');
    Session.set('requestContato', false);
    Session.set('subtopicoAtualId', null);
    Session.set('diretrizSelecionadaId', null);
    Session.set('metaSelecionadaId', null);
    Session.set('acoes', null);
});

Template.enviarPropostaInclusaoAcoes.helpers({
    errorMessages: function(){
        var invalidKeys = Template.instance().validator.invalidKeys();
        var errorMessages = _.map(invalidKeys, function(error){
            return Template.instance().validator.keyErrorMessage(error.name);
        });
        //console.log(errorMessages);
        return errorMessages;
    }
});

Template.enviarPropostaInclusaoAcoes.events({
    'submit': function(event, template){
        event.preventDefault();
        var informacoesContato = Session.get('informacoesContato');

        var proposta = {};
        proposta.tipo = 'inclusao';
        proposta.subtipo = 'acoes';
        proposta.topicoId = template.$('#inputTopico').val();
        proposta.subtopicoId = Session.get('subtopicoAtualId');
        proposta.diretrizId = Session.get('diretrizSelecionadaId');
        proposta.metaId = Session.get('metaSelecionadaId');
        proposta.nodeId = Session.get('metaSelecionadaId');
        proposta.acoes = this.acoes.get();

        PdiPropostaInclusaoAcoesSchema.clean(proposta);

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

Template.enviarPropostaInclusaoAcoes.onDestroyed(function(){
    //Session.set('requestContato', false);
});