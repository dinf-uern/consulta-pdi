Template.estrutura.onCreated(function(){
    Tracker.autorun(function(){
       var topicoAtualId = Session.get('topicoAtualId');
        Meteor.subscribe('pdiSubnodes', topicoAtualId);
    });
});

Template.estrutura.helpers({
    topicos: function(){
        return PdiNodes.find({'nodePaiId':{$exists:false}, tipo:'topico'}, {sort:{texto:1}});
    },
    nodes: function(){
        var topicoAtualId = Session.get('topicoAtualId');
        if (topicoAtualId)
            return PdiNodes.find({nodePaiId: topicoAtualId}, {sort:{ordem:1}});

    },
    naoTemTopicoSelecionado: function(){
        var topicoAtualId = Session.get('topicoAtualId');
        return !topicoAtualId;
    },
    selectedOption: function(){
        var topicoAtualId = Session.get('topicoAtualId');
        return this._id === topicoAtualId;
    }
});

Template.estrutura.events({
    'change .input-topico': function (event, template) {
        Session.set('selectedNodeId', event.target.value);
        Session.set('topicoAtualId', event.target.value);
    }
});