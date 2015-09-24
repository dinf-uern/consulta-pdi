PdiNodes = new Mongo.Collection('pdiNodes');

PdiNodes.findByOldId = function(id) {
    return this.findOne({id: id});
}

PdiNodes.getPai = function(node){
    var result = null;
    if (node && node.nodePaiId)
        result = this.findOne(node.nodePaiId);
    return result;
}

PdiNodes.updatePaiContendoNodesComProposta = function(node){
    var pai = this.getPai(node);

    if (pai) {
        PdiNodes.update(node, {$set: {temFilhoComProposta: true}});
        this.updatePaiContendoNodesComProposta(pai);
    }

}

Meteor.methods({
    /*addPdiNode: function(node){
        return PdiNodes.insert(node);
    },
    addPdiSubnode: function(subnode){
        return PdiNodes.insert(subnode);
    },
    removeNode: function(nodeId){
        PdiNodes.remove(nodeId);
    },
    subirNode: function(nodeId){
        var node = PdiNodes.findOne(nodeId);
        var ordem = 0;

        if (!node)
            throw new Meteor.Error('node-inexistente', 'O node não existe!');

        if (node.ordem)
            ordem = node.ordem;

        PdiNodes.update(node._id, {$set: {ordem: ordem - 1}});
    },
    descerNode: function(nodeId){
        var node = PdiNodes.findOne(nodeId);
        var ordem = 0;

        if (!node)
            throw new Meteor.Error('node-inexistente', 'O node não existe!');

        if (node.ordem)
            ordem = node.ordem;

        PdiNodes.update(node._id, {$set: {ordem: ordem + 1}});
    }*/
})

PdiNodes.after.remove(function(userId, doc){
    PdiNodes.remove({nodePaiId: doc._id})
});