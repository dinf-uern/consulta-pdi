Template.registerHelper('activeRouteClass', function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();

    var active = _.any(args, function(name) {
        return Router.current() && Router.current().route.getName() === name
    });

    return active && 'active';
});

Template.registerHelper('activeRouteClassDropdown', function(states) {
    var active = _.any(states, function(name) {
        return Router.current() && Router.current().route.getName() === name;
    });

    return active && 'active';
});