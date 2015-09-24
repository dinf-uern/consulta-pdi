Template.propostaItem.onCreated(function(){
    this.expandir = new ReactiveVar(true);
});

Template.propostaItem.helpers({
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