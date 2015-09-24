Template.gerenciarPropostas.onCreated(function(){
    Session.set('mostrarParagrafos', false);

    Tracker.autorun(function(){
        var topicoAtualId = Session.get('topicoAtualId');
        Meteor.subscribe('pdiSubnodes', topicoAtualId);
    });
});


Template.gerenciarPropostas.helpers({
    topicoAtual: function(){
        var topicoAtualId = Session.get('topicoAtualId');
        return PdiNodes.findOne(topicoAtualId);
    },
    nodes: function(){
        var topicoAtualId = Session.get('topicoAtualId');
        if(topicoAtualId)
            return PdiNodes.find({nodePaiId: topicoAtualId});
    },
    selectedOption: function(){
        var topicoAtualId = Session.get('topicoAtualId');
        return this._id === topicoAtualId;
    },
    mostrarParagrafos: function(){
        return Session.get('mostrarParagrafos');
    },
    somenteComProposta: function(){
        return Session.get('somenteComProposta');
    }
});

Template.gerenciarPropostas.events({
    'change .input-topico': function (event, template) {
        Session.set('topicoAtualId', event.target.value);
    },
    'change #inputMostrarParagrafos': function (event, template) {
        Session.set('mostrarParagrafos', template.$('#inputMostrarParagrafos').is(':checked'));
    },
    'change #inputSomenteComProposta': function (event, template) {
        Session.set('somenteComProposta', template.$('#inputSomenteComProposta').is(':checked'));
    }
});