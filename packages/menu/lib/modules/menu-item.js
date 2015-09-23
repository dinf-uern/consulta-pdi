MenuItem = function(dataItem, roles){
    this.dataItem = new ReactiveVar(dataItem);
    this.subitems = new ReactiveVar([]);
    this.roles = new ReactiveVar(roles);
}

MenuItem.prototype.add = function(item){
    var subitems = this.subitems.get();
    subitems.push(item);
    this.subitems.set(subitems);
}

MenuItem.prototype.canShow = function(user, roles){
    var self = this;

    //se o menu requer login e não há usuário logado
    if (self.dataItem.get().onlyLoggedIn && !user)
        return false;

    if (self.dataItem.get().ifNotLogged && user)
        return false;

    if (!self.roles.get() || self.roles.get().length <= 0)
        return true;

    //se não há usuário logado, mas a exibição do menu requer papéis => esconde o menu
    if (!user && self.roles.get() && self.roles.get().length > 0)
        return false;

    var comumRoles = _.intersection(self.roles.get(), roles);

    return !!(comumRoles && comumRoles.length > 0);
}

MenuItem.prototype.getSubitems = function(user, roles){
    var self = this;
    var result = _.filter(self.subitems.get(), function(item){
        return item.canShow(user, roles);
    });
    return result;
}