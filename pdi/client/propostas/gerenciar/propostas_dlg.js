Template.propostasDlg.onCreated(function(){
    var self = this;

    var tabs = [
        {id: "tabPropostasAlteracao", title: "Alteração", filterTipo: 'alteracao', icon: 'fa-eraser'},
        {id: "tabPropostasInclusao", title: "Inclusão", filterTipo: 'inclusao', icon: 'fa-plus'}
    ];

    if (this.data.currentTab)
        this.currentTab = new ReactiveVar(self.data.currentTab)
    else
        this.currentTab = new ReactiveVar(tabs[0].id);

    this.tabs = new ReactiveVar(tabs);

    this.ocultarDesconsideradas = new ReactiveVar(false);

    this.propostasHandle = Meteor.subscribe('nodePropostas', self.data.node._id);
});

Template.propostasDlg.helpers({
    ready: function(){
      return Template.instance().propostasHandle.ready();
    },
    tabs: function(){
        return Template.instance().tabs.get();
    },
    activePageClass: function(){
        return this.id === Template.instance().currentTab.get()?'active':'';
    },
    activeTabClass: function(){
        return this.id === Template.instance().currentTab.get()?'active':'';
    },
    propostas: function(){
        var self = this;
        var node = Template.instance().data.node;
        var ocultarDesconsideradas = Template.instance().ocultarDesconsideradas.get();
        var query = { $and: [{tipo: self.filterTipo}, {nodeId: node._id}] };

        if (ocultarDesconsideradas)
            query.$and.push({desconsiderada: {$ne: true}});

        return PdiPropostas.find(query);
    }
});

Template.propostasDlg.events({
    'change #inputOcultarDesconsideradas': function(event, template){
        var value = template.$(event.target).is(':checked');
        template.ocultarDesconsideradas.set(value);
    }
});
