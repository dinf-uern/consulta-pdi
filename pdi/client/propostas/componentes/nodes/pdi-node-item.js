Template.pdiNodeItem.onCreated(function () {
    //console.log(this.data);

    var mostrarIndicadoresPropostas = this.data.mostrarIndicadoresPropostas === false? false: true;
    var selecionavel = this.data.selecionavel === false? false: true;
    var mostrarSubnodes = this.data.mostrarSubnodes === false? false: true;

    this.mostrarIndicadoresPropostas = new ReactiveVar(mostrarIndicadoresPropostas);
    this.selecionavel = new ReactiveVar(selecionavel);
    this.mostrarSubnodes = new ReactiveVar(mostrarSubnodes);

    var tiposSemSubnodes = ['paragrafo', 'acao'];

    if (tiposSemSubnodes.indexOf(this.data.node.tipo) < 0)
        this.subnodesHandle = Meteor.subscribe('pdiSubnodes', this.data.node._id);

});

Template.pdiNodeItem.helpers({
    mostrarIndicadoresPropostas: function(){
        return Template.instance().mostrarIndicadoresPropostas.get();
    },
    selecionavel: function(){
        return Template.instance().selecionavel.get();
    },
    mostrarSubnodes: function(){
        return Template.instance().mostrarSubnodes.get();
    },
    carregou: function(){
        return Template.instance().subnodesHandle?Template.instance().subnodesHandle.ready():true;
    },
    selected: function(){
        var selectedNodeId = Session.get('selectedNodeId');
        return this.node._id === selectedNodeId;
    },
    selectableClass: function(){
      return Template.instance().selecionavel.get() === true? 'selectable': '';
    },
    selectedClass: function(){
        var selectedNodeId = Session.get('selectedNodeId');
        return this.node._id === selectedNodeId && Template.instance().selecionavel.get() ? 'selected': '';
    },
    mostrarPostBox: function(){
        var selectedNodeId = Session.get('selectedNodeId');
        return this.node._id === selectedNodeId && Template.instance().selecionavel.get();
    },
    isTopico: function(){
        return this.node.tipo === 'topico';
    },
    isSubtopico: function(){
        return this.node.tipo === 'subtopico';
    },
    isParagrafo: function () {
        return this.node.tipo === 'paragrafo';
    },
    isDiretriz: function () {
        return this.node.tipo === 'diretriz';
    },
    isMeta: function () {
        return this.node.tipo === 'meta';
    },
    isAcao: function () {
        return this.node.tipo === 'acao';
    },
    subnodes: function(){
        var mostrarParagrafos = Session.get('mostrarParagrafos');
        var somenteComProposta = Session.get('somenteComProposta');

        var query = {nodePaiId: this.node._id};

        if (!mostrarParagrafos)
            query.tipo = {$ne: 'paragrafo'};

        if (somenteComProposta)
            query.$or = [{countPropostasInclusao: {$gt: 0}}, {countPropostasAlteracao: {$gt: 0}}, {temFilhoComProposta: true}];

        return PdiNodes.find(query, {sort: {texto: 1}});
    }
});

Template.pdiNodeItem.events({
    'click .pdi-node-item-main': function(e, template){
        //console.log(e);
        e.stopPropagation();

        if (template.selecionavel.get())
            Session.set('selectedNodeId', this.node._id);
    }
});