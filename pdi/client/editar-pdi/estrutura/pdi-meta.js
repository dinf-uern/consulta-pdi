Template.pdiMeta.onCreated(function () {
    this.mostrar = new ReactiveVar(true);
    this.mostrarSubnodes = new ReactiveVar(false);

    Tracker.autorun(function () {
        console.log(Session.get('selectedNodeId'));
    })
});

Template.pdiMeta.helpers({
    selectedClass: function(){
        var selectedNodeId = Session.get('selectedNodeId');
        return this._id === selectedNodeId? 'selected': '';
    },
    mostrar: function () {
        return Template.instance().mostrar.get();
    },
    mostrarSubnodes: function () {
        return Template.instance().mostrarSubnodes.get();
    },
    subnodes: function(){
        return PdiNodes.find({nodePaiId: this._id});
    },
    countSubnodes: function(){
        return PdiNodes.find({nodePaiId: this._id}).count();
    }
});

Template.pdiMeta.events({
    'click .pdi-meta': function(e, template){
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
    'click .btn-mostrar-subnodes': function(e, template){
        template.mostrarSubnodes.set(true);
        //
    },
    'click .btn-esconder-subnodes': function(e, template){
        template.mostrarSubnodes.set(false);
    },
    'click .btn-remove': function(e, template){
        if(confirm('Todos os nodes filhos serão removidos. Deseja continuar?')){
            Meteor.call('removeNode', this._id);
        }
    }
});