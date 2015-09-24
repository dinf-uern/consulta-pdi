Template.comboMeta.onCreated(function () {
    Tracker.autorun(function(){
        var diretrizSelecionadaId = Session.get('diretrizSelecionadaId');
        Meteor.subscribe('pdiSubnodes', diretrizSelecionadaId);
    });
});

Template.comboMeta.events({
    'change #inputMeta': function(event, template){
        Session.set('metaSelecionadaId', event.target.value);
    }
})

Template.comboMeta.helpers({
    metas: function(){
        var diretrizSelecionadaId = Session.get('diretrizSelecionadaId');
        return PdiNodes.find({nodePaiId: diretrizSelecionadaId, tipo: 'meta'}).fetch();
    },
    disableMeta: function(){
        var diretrizSelecionadaId = Session.get('diretrizSelecionadaId');
        var items = PdiNodes.find({nodePaiId: diretrizSelecionadaId, tipo: 'meta'}).fetch();
        return !(diretrizSelecionadaId && items.length > 0);
    }
})