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

var contaMenu = new MenuItem({title: getMenuContaTitle, onlyLoggedIn: true});
contaMenu.add(new MenuItem({title: 'sair', state: 'sair', onlyLoggedIn: true}));

var testMenu = new MenuItem({title:'some title'});

Menu.add(contaMenu, 'right');
//Menu.add(testMenu);