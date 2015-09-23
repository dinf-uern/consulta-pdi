Package.describe({
  name: 'dinf-uern:menu',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use([
    'reactive-var',
    'templating',
    'underscore'
  ]);

  api.use(["iron:router"], 'client', {weak: false, unordered: false});

  api.addFiles([
    'lib/modules/menu.js',
    'lib/modules/menu-item.js',
    'lib/templates/menu.html',
    'lib/templates/menu.js',
    'lib/templates/menu-item.html',
    'lib/templates/menu-item.js',
    'lib/helpers/active_route_class.js'
  ], ['client']);

  api.export("Menu", ['client']);
  api.export("MenuItem", ['client']);
});

Package.onTest(function(api) {
  api.use([
    'tinytest',
    'dinf-uern:menu'
  ], ['client']);

  api.addFiles('tests/menu-item-tests.js', 'client');
  api.addFiles('tests/menu-tests.js', 'client');
});
