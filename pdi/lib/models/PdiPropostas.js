PdiPropostas = new Mongo.Collection('pdiPropostas');

PdiPropostas.before.insert(function(userId, doc){
    doc.enviadoEm = new Date();
});

PdiPropostas.after.update(afterUpdateProposta);

PdiPropostas.after.insert(afterInsertProposta);

PdiPropostas.after.remove(afterInsertProposta);


function afterInsertProposta(userId, doc){
    var nodeId = doc.nodeId;

    if (doc.tipo === 'inclusao') {
        var countPropostasInclusao = PdiPropostas.find({tipo:'inclusao', nodeId:nodeId}).count();
        PdiNodes.update({_id: nodeId}, {$set:{countPropostasInclusao: countPropostasInclusao}});
    }

    if (doc.tipo === 'alteracao') {
        var countPropostasAlteracao = PdiPropostas.find({tipo:'alteracao', nodeId:nodeId}).count();
        PdiNodes.update({_id: nodeId}, {$set:{countPropostasAlteracao: countPropostasAlteracao}});
    }

    var node = PdiNodes.findOne(doc.nodeId);
    PdiNodes.updatePaiContendoNodesComProposta(node);
}

function afterUpdateProposta(userId, doc, fieldNames, modifier, options) {
    if ((modifier.$set && modifier.$set.homologada === true) || (modifier.$unset && modifier.$unset.homologada === '')) {
        var countPropostasInclusaoHomologadasNoMesmoNode = PdiPropostas.find({tipo:'inclusao', nodeId: doc.nodeId, homologada: true}).count();
        var countPropostasAlteracaoHomologadasNoMesmoNode = PdiPropostas.find({tipo:'alteracao', nodeId: doc.nodeId, homologada: true}).count();
        var temFilhoComPropostaInclusaoHomologada = countPropostasInclusaoHomologadasNoMesmoNode > 0;
        var temFilhoComPropostaAlteracaoHomologada = countPropostasAlteracaoHomologadasNoMesmoNode > 0;
        var node = PdiNodes.findOne(doc.nodeId);
        //atualiza os nodes pais indicando que tem filho com proposta homologada
        PdiNodes.updateParentTree(node, {$set: {temFilhoComPropostaHomologada: temFilhoComPropostaAlteracaoHomologada || temFilhoComPropostaInclusaoHomologada}});

        //var valor = modifier.$unset && !temFilhoComPropostaHomologada? false: true;

        if (doc.tipo === 'alteracao') {
            PdiNodes.update(doc.nodeId, {$set: {temPropostaAteracaoHomologada: temFilhoComPropostaAlteracaoHomologada}});
        } else if (doc.tipo === 'inclusao') {
            PdiNodes.update(doc.nodeId, {$set: {temPropostaInclusaoHomologada: temFilhoComPropostaInclusaoHomologada}});
        }

    }


    /*PdiNodes.updateParentTree() = function(node){
        var propostasHomologadas = PdiPropostas.find({})
        var pai = this.getPai(node);

        if (pai) {
            PdiNodes.update(node, {$set: {temFilhoComPropostaHomologada: value}});
            this.atualizarEstruturaNodesComPropostaHomologada(pai);
        }
    }*/
}

Meteor.methods({
    homologarProposta: function(propostaId){
        var self = this;
        if (!Roles.userIsInRole(self.userId, ['admin','pdi-admin']))
            throw new Meteor.Error('Acesso negado!');

        PdiPropostas.update({_id: propostaId}, {$set: {homologada: true}});
    },
    removerHomologacao: function(propostaId){
        var self = this;
        if (!Roles.userIsInRole(self.userId, ['admin','pdi-admin']))
            throw new Meteor.Error('Acesso negado!');

        PdiPropostas.update({_id: propostaId}, {$unset: {homologada: ""}});
    },
    desconsiderarProposta: function(propostaId){
        var self = this;
        if (!Roles.userIsInRole(self.userId, ['admin','pdi-admin']))
            throw new Meteor.Error('Acesso negado!');

        PdiPropostas.update({_id: propostaId}, {$set: {desconsiderada: true}});
    },
    reconsiderarProposta: function(propostaId){
        var self = this;
        if (!Roles.userIsInRole(self.userId, ['admin','pdi-admin']))
            throw new Meteor.Error('Acesso negado!');

        PdiPropostas.update({_id: propostaId}, {$unset: {desconsiderada: ""}});
    },
    enviarPropostaInclusao: function(proposta, contatoId) {
        var hipchat;

        if (Meteor.isServer)
            hipchat = new HipChatNotify();

        proposta.tipo = 'inclusao';

        switch(proposta.subtipo){
            case 'acoes':
                PdiPropostaInclusaoAcoesSchema.clean(proposta, {removeEmptyStrings: true});
                check(proposta, PdiPropostaInclusaoAcoesSchema);
                break;
            case 'metas':
                PdiPropostaInclusaoMetasSchema.clean(proposta, {removeEmptyStrings: true});
                check(proposta, PdiPropostaInclusaoMetasSchema);
                break;
            case 'diretriz':
                PdiPropostaInclusaoDiretrizSchema.clean(proposta, {removeEmptyStrings: true});
                check(proposta, PdiPropostaInclusaoDiretrizSchema);
                break;
        };

        var _id = PdiPropostas.insert(proposta);

        if (hipchat)
            hipchat.warning(EJSON.stringify(proposta));

        return _id;
    },
    enviarPropostaAlteracao: function(proposta, contatoId) {
        var hipchat;

        if (Meteor.isServer)
            hipchat = new HipChatNotify();

        proposta.tipo = 'alteracao';

        PdiPropostaAlteracaoSchema.clean(proposta, {removeEmptyStrings: true});
        check(proposta, PdiPropostaAlteracaoSchema);

        //console.log(proposta);

        var _id = PdiPropostas.insert(proposta);

        if (hipchat)
            hipchat.success(EJSON.stringify(proposta));

        return _id;
    },
    qtdPropostasUltimos7Dias: function(){
        if (Meteor.isServer) {
            var primeira_data = moment(new Date()).subtract(7, 'days').toDate();
            //console.log(primeira_data);

            var pipeline = [
                {
                    $match: {
                        enviadoEm: {
                            $gte: primeira_data
                        }
                    }
                },
                {
                    $group: {
                        _id : { dia: { $dayOfMonth: "$enviadoEm" }, mes: { $month: "$enviadoEm" }, ano: { $year: "$enviadoEm" } },
                        total: {$sum: 1}
                    }
                },
                {
                    $sort: {
                        '_id.ano': 1,
                        '_id.mes': 1,
                        '_id.dia': 1
                    }
                },
            ];

            var result = PdiPropostas.aggregate(pipeline);

            //console.log(result);
            return result;
        }
    }
});