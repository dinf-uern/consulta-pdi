Template.menu.helpers({
    items: function(){
        var user = Meteor.user();
        var roles = user && user.roles? user.roles: [];
        return Menu.getItems(this.menuGroup, user, roles);
    }
});

Template.menu.events({

});