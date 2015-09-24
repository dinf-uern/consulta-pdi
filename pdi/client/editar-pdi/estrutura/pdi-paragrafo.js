Template.pdiParagrafo.onCreated(function () {
    this.mostrar = new ReactiveVar(false);
});

Template.pdiParagrafo.helpers({
    selectedClass: function(){
        var selectedNodeId = Session.get('selectedNodeId');
        return this._id === selectedNodeId? 'selected': '';
    },
    mostrar: function () {
        return Template.instance().mostrar.get();
    },
    mostrarSubnodes: function () {
        return true;
    },
    subnodes: function(){
        return PdiNodes.find({nodePaiId: this._id});
    }
});

Template.pdiParagrafo.events({
    'click .pdi-paragrafo': function(e, template){
        e.stopPropagation();
        Session.set('selectedNodeId', this._id);

    },
    'click .btn-mostrar': function(e, template){
        template.mostrar.set(true);
        //
    },
    'click .btn-esconder': function(e, template){
        template.mostrar.set(false);
    },
    'click .btn-remove': function(e, template){
        Meteor.call('removeNode', this._id);
    }
});