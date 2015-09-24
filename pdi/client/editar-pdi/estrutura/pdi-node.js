Template.pdiNode.onCreated(function () {
    Meteor.subscribe('pdiSubnodes', this.data._id);
    this.mostrar = new ReactiveVar(true);
});

Template.pdiNode.helpers({
    mostrar: function () {
        return Template.instance().mostrar.get();
    },
    selectedClass: function(){
        var selectedNodeId = Session.get('selectedNodeId');
        return this._id === selectedNodeId? 'selected': '';
    },
    isTopico: function(){
        return this.tipo === 'topico';
    },
    isSubtopico: function(){
        return this.tipo === 'subtopico';
    },
    isParagrafo: function () {
        return this.tipo === 'paragrafo';
    },
    isDiretriz: function () {
        return this.tipo === 'diretriz';
    },
    isMeta: function () {
        return this.tipo === 'meta';
    },
    isAcao: function () {
        return this.tipo === 'acao';
    }
});

Template.pdiNode.events({
    'click .pdi-node': function(e, template){
        Session.set('selectedNodeId', this._id);
    },
    'click .btn-mostrar': function(e, template){
        template.mostrar.set(true);
    },
    'click .btn-esconder': function(e, template){
        template.mostrar.set(false);
    }
});