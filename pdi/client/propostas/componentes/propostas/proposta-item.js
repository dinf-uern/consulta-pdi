Template.propostaItem.onCreated(function(){
    this.expandir = new ReactiveVar(true);
});

Template.propostaItem.helpers({
    panelClass: function(){
        return this.homologada && this.homologada === true? 'panel-success': 'panel-default';
    },
    expandir: function(){
      return Template.instance().expandir.get();
    },
    isPropostaInclusao: function(){
        return this.tipo === 'inclusao';
    },
    isPropostaAlteracao: function(){
        return this.tipo === 'alteracao';
    },
    classDesconsiderada: function(){
        return this.desconsiderada? 'desconsiderada': '';
    },
    contato: function(){
        var self = this;
        var contato = PdiContatosPropostas.findOne(self.contatoId);
        return contato;
    },
    data: function(){
        var self = this;
        return moment(self.enviadoEm).fromNow();
    }
});

Template.propostaItem.events({
    'click .btn-homologar': function(event, template){
        var self = this;
        template.aguardandoHomologar.set(true);
        Meteor.call('homologarProposta', self._id, function(err, data){
            if (err)
                toastr.error(err.reason);
            template.aguardandoHomologar.set(false);
        });
    },
    'click .btn-desfazer-homologacao': function(event, template){
        var self = this;
        template.aguardandoDesfazerHomologacao.set(true);
        Meteor.call('removerHomologacao', self._id, function(err, data){
            if (err)
                toastr.error(err.reason);
            template.aguardandoDesfazerHomologacao.set(false);
        });
    },
    'click .btn-desconsiderar': function(event, template){
        var self = this;

        Meteor.call('desconsiderarProposta', self._id, function(err, data){
            if (err)
                toastr.error(err.reason);
        });

    },
    'click .btn-reconsiderar': function(event, template){
        var self = this;

        Meteor.call('reconsiderarProposta', self._id, function(err, data){
            if (err)
                toastr.error(err.reason);
        });
    },
    'click .btn-expandir': function(event, template){
        template.expandir.set(true);
    },
    'click .btn-contrair': function(event, template){
        template.expandir.set(false);
    }
});