fs = Meteor.npmRequire('fs');

Meteor.startup(function () {

    //var pdiNodesFilePath = 'C:\\Users\\luis\\Google Drive\\DINF\\Repositorios\\pdi4\\pdiNodes.json';
    /*var pdiNodesStr = Assets.getText('pdiNodes.json');
    var nodesArr = JSON.parse(pdiNodesStr);
    if (PdiNodes.find().count() === 0) {
        nodesArr.forEach(function (item) {
            PdiNodes.insert(item);
        })

        PdiNodes.find().forEach(function(item){
            //console.log(item);
            //return;

            if (item.nodePaiId && item.nodePaiId !== "") {
                var pai = PdiNodes.findByOldId(item.nodePaiId);
                //console.log(pai);
                if (pai) {
                    PdiNodes.update(item._id, {$set:{nodePaiId: pai._id}})
                }
            }
        });
    }*/

    //var diretrizesNodes = PdiNodes.find({tipo: 'diretriz'}).fetch();
    var nodesComPropostas = PdiNodes.find({$or: [{countPropostasInclusao: {$gt: 0}}, {countPropostasAlteracao: {$gt: 0}}]}).fetch();

    //_.map(diretrizesNodes, updateParentTree);
    _.map(nodesComPropostas, updatePaiContendoNodesComProposta);

    //var nodes = PdiNodes.find({});
    //_.each(nodes, function(node){
    //   PdiNodes.update({}, {$set: {countPropostasAlteracao: 0, countPropostasInclusao: 0}}, {multi: true});
    //});

});

function updatePaiContendoNodesComProposta(node){
    var pai = getPai(node);

    if (pai) {
        setTemFilhoComProposta(pai);
        updatePaiContendoNodesComProposta(pai);
    }

}

function updateParentTree(node){
    var pai = getPai(node);
    if (pai) {
        setTemDiretriz(pai);
        updateParentTree(pai);
    }
}

function setTemDiretriz(node){
    PdiNodes.update(node, {$set: {temDiretriz: true}});
}

function setTemFilhoComProposta(node){
    PdiNodes.update(node, {$set: {temFilhoComProposta: true}});
}

getPai = function(node){
    var result = null;
    if (node && node.nodePaiId)
        result = PdiNodes.findOne(node.nodePaiId);
    return result;
}