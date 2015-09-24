Template.postBox.onCreated(function(){
    this.tabAtual = new ReactiveVar('#proporAlteracao');
    this.validator = PdiPropostaAlteracaoSchema.namedContext('pdiPropostaAlteracaoSchema');
    this.validator.resetValidation();
});

Template.postBox.helpers({
    activeTabClass: function(tabName){
        //console.log(Router.controller);
        return tabName == Template.instance().tabAtual.get()?'active':'';
    },
    activeTab: function(tabName){
        return tabName == Template.instance().tabAtual.get();
    },
    errorMessage: function(key){
        return Template.instance().validator.keyErrorMessage(key);
    },
    errorClass: function(key){
        return !!Template.instance().validator.keyErrorMessage(key)?'has-error':'';
    },
    mostrarTabInclusao: function(){
        //console.log(this);
    }
});

Template.postBox.events({
    'click ul.nav.nav-tabs li a': function(event, template){
        event.preventDefault();
        template.tabAtual.set(template.$(event.target).attr('href'));
    },
    'submit': function(event, template){
        event.preventDefault();
        var informacoesContato = Session.get('informacoesContato');

        var proposta = {};

        //if (event.target.id == 'formAlteracao') {
        proposta.descricao = template.$('#inputDescricaoPropostaAlteracao').val();
        proposta.tipo = 'alteracao';
        /*} else {
            proposta.descricao = template.$('#inputDescricaoPropostaInclusao').val();
            proposta.tipo = 'inclusao';
        }*/

        proposta.nodeId = this.node._id;

        if (informacoesContato && informacoesContato._id)
            proposta.contatoId = informacoesContato._id;

        PdiPropostaAlteracaoSchema.clean(proposta, {removeEmptyStrings: true});

        if (!template.validator.validate(proposta, {}))
            return;

        Meteor.call('enviarPropostaAlteracao', proposta, function(error, propostaId) {
            if (error)
                return toastr.error(error.reason);

            toastr.success('Proposta recebida com sucesso!');

            Session.set('selectedNodeId', null);


            if (informacoesContato) {
                Meteor.call('atualizarContatoPropostas', [propostaId], informacoesContato._id);
            } else {
                var propostasEnviadas = Session.get('propostasEnviadasSemContato');

                if (!propostasEnviadas)
                    propostasEnviadas = [];

                propostasEnviadas.push(propostaId);
                Session.set('propostasEnviadasSemContato', propostasEnviadas);

                Modal.show('dlgIdentificacao');
            }

        });
    }
});