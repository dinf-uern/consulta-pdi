Menu = {
    items: new ReactiveVar([]),
    add: function(menuItem, menuGroup){
        var items = this.items.get();

        if (!items[menuGroup])
            items[menuGroup] = [];

        items[menuGroup].push(menuItem);
        this.items.set(items);
    },
    getItems: function(menuGroup, user, roles){
        var self = this;

        var result = _.filter(self.items.get()[menuGroup], function(item){
            return item.canShow(user, roles);
        });

        return result;
    }
}