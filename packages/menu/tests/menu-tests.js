// Write your tests here!
// Here is an example.
Tinytest.add('O objeto global Menu deve estar disponivel', function (test) {
  test.notEqual( typeof Menu, "undefined" );
  Menu.items.set([]);
});

Tinytest.add('Deve ser capaz de adicionar items de menus para um grupo de menus específico', function (test) {
  var menuItem = {title: 'some'};
  Menu.add(menuItem, 'menuGroup');
  test.isTrue(Menu.items.get()['menuGroup'].indexOf(menuItem) >= 0);
  Menu.items.set([]);
});

Tinytest.add('Deve exibir items de menu sem restrição para um grupo de menus específico quando não houver usuario logado', function (test) {
  var usuario = undefined;
  var papeis = [];
  var menuItem = new MenuItem({title:'title'});
  Menu.add(menuItem, 'menuGroup');
  var items = Menu.getItems('menuGroup', usuario, papeis);
  test.length(items, 1);
  Menu.items.set([]);
});

Tinytest.add('Deve exibir items de menu sem restrição para um grupo de menus específico quando houver usuario logado', function (test) {
  var usuario = {};
  var papeis = [];
  var menuItem = new MenuItem({title:'title'});
  Menu.add(menuItem, 'menuGroup');
  var items = Menu.getItems('menuGroup', usuario, papeis);
  test.length(items, 1);
  Menu.items.set([]);
});

Tinytest.add('Deve exibir items de menu com restrição para um grupo de menus específico quando houver usuário logado e tiver permissão', function (test) {
  var usuario = {};
  var papeis = ['role'];
  var menuItem = new MenuItem({title:'title'}, ['role']);
  Menu.add(menuItem, 'menuGroup');
  var items = Menu.getItems('menuGroup', usuario, papeis);
  test.length(items, 1);
  Menu.items.set([]);
});

Tinytest.add('Não deve exibir items de menu com restrição para um grupo de menus específico quando não houver usuário logado', function (test) {
  var usuario = undefined;
  var papeis = [];
  var menuItem = new MenuItem({title:'title'}, ['role']);
  Menu.add(menuItem, 'menuGroup');
  var items = Menu.getItems('menuGroup', usuario, papeis);
  test.length(items, 0);
  Menu.items.set([]);
});

Tinytest.add('Não deve exibir items de menu com restrição para um grupo de menus específico quando houver usuário logado e não tiver permissão', function (test) {
  var usuario = {};
  var papeis = ['role1'];
  var menuItem = new MenuItem({title:'title'}, ['role2']);
  Menu.add(menuItem, 'left');
  var items = Menu.getItems('left', usuario, papeis);
  test.length(items, 0);
  Menu.items.set([]);
});

Tinytest.add('Não deve exibir items de menu restritos a usuarios logados para um grupo de menus específico se não houver usuario logado', function (test) {
  var usuario = undefined;
  var papeis = undefined;
  var menuItem = new MenuItem({title:'title', onlyLoggedIn: true});
  Menu.add(menuItem, 'menuGroup');
  var items = Menu.getItems('menuGroup', usuario, papeis);
  test.length(items, 0);
  Menu.items.set([]);
});

Tinytest.add('Não deve exibir items de menu restritos a usuarios anônimos para um grupo de menus específico se houver usuario logado', function (test) {
  var usuario = {};
  var papeis = [];
  var menuItem = new MenuItem({title:'title', ifNotLogged: true});
  Menu.add(menuItem, 'menuGroup');
  var items = Menu.getItems('menuGroup', usuario, papeis);
  test.length(items, 0);
  Menu.items.set([]);
});

