var menuHome = new MenuItem({title:'home', state:'home'});
var item1 = new MenuItem({title:'menu1', state:'another'});
var submenu1 = new MenuItem({title:'submenu1(publico)'});
var submenu2 = new MenuItem({title:'submenu2(user)'}, ['user']);
var item2 = new MenuItem({title:'menu2'});
var submenu3 = new MenuItem({title:'submenu3 (publico)'});
Menu.add(menuHome, 'left');
Menu.add(item1, 'left');
Menu.add(item2, 'right');
item1.add(submenu1);
item1.add(submenu2);
item2.add(submenu3);
Errors.throw('um erro qualquer em ' + moment(new Date()).format('MMMM Do YYYY, h:mm:ss a') + '!');

Shell.setConfig({
    lang: "pt-BR"
});

