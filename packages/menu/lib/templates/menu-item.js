Template.menuItem.helpers({
    dataItem: function(){
        return this.dataItem.get();
    },
    getSubmenusStates: function(){
        var statesArr = [];
        if(this.subitems.get() && this.subitems.get().length > 0)
            statesArr = _.map(this.subitems.get(), function(item){
                return item.dataItem.get().state;
            });

        return statesArr;
    },
    submenus: function(){
        var user = Meteor.user();
        var roles = user && user.roles ? user.roles: [];

        return this.getSubitems(user, roles);
    },
    link: function(){
        var result = "#";
        if (this.dataItem.get() && this.dataItem.get().link)
            result = this.dataItem.get().link;

        if(this.dataItem.get() && this.dataItem.get().state)
            result = Router.routes[this.dataItem.get().state].path();

        return result;
    },
    target: function(){
        result = "";
        if (this.dataItem.get().target)
            result = this.dataItem.get().target;

        return result;
    }
});

Template.menuItem.events({
    'click a': function(event, template){
        if (this.dataItem.get() && this.dataItem.get().action && typeof this.dataItem.get().action === 'function')
            this.dataItem.get().action();
    }
});