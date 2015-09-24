Template.enviarPropostaAlteracao.onCreated(function(){
    Session.set('mostrarParagrafos', false);
    Session.set('somenteComProposta', false);

    Tracker.autorun(function(){
        var topicoAtualId = Session.get('topicoAtualId');
        Meteor.subscribe('pdiSubnodes', topicoAtualId);
    });
});


Template.enviarPropostaAlteracao.helpers({
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
    }
});

Template.enviarPropostaAlteracao.events({
    'change .input-topico': function (event, template) {
        Session.set('topicoAtualId', event.target.value);
    },
    'change #inputMostrarParagrafos': function (event, template) {
        Session.set('mostrarParagrafos', template.$('#inputMostrarParagrafos').is(':checked'));
    }
});