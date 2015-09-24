Meteor.publish('pdiSubtopicos', function(){
    return PdiSubtopicos.find();
});

Meteor.publish('pdiSubnodes', function(nodePaiId){
    //wait(500);
    return PdiNodes.find({nodePaiId: nodePaiId});
});

Meteor.publish('pdiNodes', function(){
    return PdiNodes.find({nodePaiId: {$exists: false}});
})

Meteor.publish('contatosPropostas', function(nodeId){
    var self = this;
    //console.log(PdiPropostas.find({nodeId: nodeId}).fetch());

    if (!Roles.userIsInRole(self.userId, ['admin','pdi-admin']))
        throw new Meteor.Error('Acesso negado!');

    return PdiContatosPropostas.find();
})

Meteor.publish('nodePropostas', function(nodeId){
    var self = this;

    if (!Roles.userIsInRole(self.userId, ['admin','pdi-admin']))
        throw new Meteor.Error('Acesso negado!');

    return PdiPropostas.find({nodeId: nodeId});
})

var wait = Meteor.wrapAsync(function(duration, callback){
    setTimeout(callback, duration);
});