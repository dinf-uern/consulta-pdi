Template.pdiTopico.onCreated(function () {
    this.mostrar = new ReactiveVar(true);
    this.mostrarSubnodes = new ReactiveVar(false);

    Tracker.autorun(function () {
        console.log(Session.get('selectedNodeId'));
    })
});

Template.pdiTopico.helpers({
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
        return PdiNodes.find({nodePaiId: this._id}, {sort: {ordem:1}});
    },
    countSubnodes: function(){
        return PdiNodes.find({nodePaiId: this._id}).count();
    }
});

Template.pdiTopico.events({
    'click .pdi-topico': function(e, template){
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
        if(confirm('Todos os nodes filhos ser�o removidos. Deseja continuar?')){
            Meteor.call('removeNode', this._id);
        }
    }
});