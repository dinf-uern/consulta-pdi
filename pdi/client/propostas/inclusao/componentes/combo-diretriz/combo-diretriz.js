Template.comboDiretriz.onCreated(function () {
    var self = this;
    this.diretrizSelecionadaId = new ReactiveVar(null);

    Tracker.autorun(function(){
        var subtopicoAtualId = Session.get('subtopicoAtualId');
        Meteor.subscribe('pdiSubnodes', subtopicoAtualId);
    })

});

Template.comboDiretriz.events({
    'change #inputDiretriz': function(event, template){
        Session.set('diretrizSelecionadaId', event.target.value);
    }
})

Template.comboDiretriz.helpers({
    disableDiretriz: function(){
        var subtopicoAtualId = Session.get('subtopicoAtualId');
        var items = PdiNodes.find({nodePaiId: subtopicoAtualId, tipo: 'diretriz'}).fetch();
        return !(subtopicoAtualId && items.length > 0);
    },
    diretrizes: function(){
        var subtopicoAtualId = Session.get('subtopicoAtualId');
        return PdiNodes.find({nodePaiId: subtopicoAtualId, tipo: 'diretriz'}).fetch();
    },
    diretrizId: function() {
        return Template.instance().diretrizSelecionadaId.get();
    }
})