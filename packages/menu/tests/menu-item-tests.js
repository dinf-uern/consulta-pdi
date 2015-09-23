// Write your tests here!
// Here is an example.
Tinytest.add('unitario: O construtor MenuItem deve estar disponivel', function (test) {
  test.equal( typeof MenuItem, "function" );
});

Tinytest.add('unitario: Deve ser capaz de adicionar subitems', function (test) {
  var menuItem = new MenuItem({title:'menu'});
  var submenuItem = {title:'submenu'};
  menuItem.add(submenuItem);
  test.length(menuItem.subitems.get().indexOf(submenuItem) >= 0);
  menuItem.subitems.set([]);
});

Tinytest.add('unitario: Deve permitir a exibição de items de menu sem restrição quando não houver usuario logado', function (test) {
  var user = undefined;
  var roles = undefined;
  var menuItem = new MenuItem({title:'menu'});
  test.isTrue(menuItem.canShow(user, roles));
});

Tinytest.add('unitario: Deve permitir a exibição de items de menu sem restrição quando houver usuario logado', function (test) {
  var user = {};
  var roles = [];
  var menuItem = new MenuItem({title:'menu'});
  test.isTrue(menuItem.canShow(user, roles));
});

Tinytest.add('unitario: Deve permitir a exibição de items de menu com restrição quando houver usuário logado e tiver permissão', function (test) {
  var user = {};
  var roles = ['role'];
  var menuItem = new MenuItem({title:'title'}, ['role']);
  test.isTrue(menuItem.canShow(user, roles));
});

Tinytest.add('unitario: Não deve permitir a exibição de items de menu com restrição quando não houver usuário logado', function (test) {
  var user = undefined;
  var roles = [];
  var menuItem = new MenuItem({title:'title'}, ['role']);
  test.isFalse(menuItem.canShow(user, roles));
});


Tinytest.add('unitario: Não deve permitir a exibição de items de menu com restrição quando houver usuário logado e não tiver permissão', function (test) {
  var user = {};
  var roles = ['role1'];
  var menuItem = new MenuItem({title:'title'}, ['role2']);
  test.isFalse(menuItem.canShow(user, roles));
});

Tinytest.add('unitario: Não deve permitir a exibição de items de menu restritos a usuarios logados se não houver usuario logado', function (test) {
  var user = undefined;
  var roles = [];
  var menuItem = new MenuItem({title:'title', onlyLoggedIn: true}, []);
  test.isFalse(menuItem.canShow(user, roles));
});


Tinytest.add('unitario: Não deve permitir a exibição de items de menu restritos a usuarios anônimos se houver usuario logado', function (test) {
  var user = {};
  var roles = [];
  var menuItem = new MenuItem({title:'title', ifNotLogged: true}, []);
  test.isFalse(menuItem.canShow(user, roles));
});
