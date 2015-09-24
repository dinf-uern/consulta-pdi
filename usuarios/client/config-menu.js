getMenuContaTitle = function(){
    var user = Meteor.user();

    function getUserName(user){
        var email = user.emails[0].address;
        var i = email.indexOf('@');
        return email.substr(0,i);
    }

    if (user)
        return getUserName(user);

    return 'Conta';
}

Menus.addMenuItem({
    title: getMenuContaTitle, loggedIn: true, side: 'right', submenus: [
        {title: 'Sair', loggedIn: true, state: 'sair'}
    ]
});