Package.describe({
  name: 'dinf-uern:shell',
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
    'templating',
    'underscore',
    'reactive-var'
  ]);

  api.use([
    'bootswatch:paper',
    'dinf-uern:header',
    'dinf-uern:footer'
  ],['client']);

  api.use([
    'iron:router',
    'momentjs:moment',
    'tap:i18n',
    'rzymek:moment-locale-pt-br'
  ], ['client', 'server']);

  api.addFiles([
    'server/date-on-server.js'
  ], ['server']);

  api.addFiles([
    'client/date-on-server.js',
    'lib/modules/shell.js',
    'lib/templates/head-section.html',
    'lib/templates/layout.html',
    'lib/templates/layout.js',
    'lib/templates/access-denied.html',
    'lib/templates/not-found.html'
  ],['client']);

  api.addFiles([
    'lib/router.js'
  ],['client', 'server']);

  api.export("Shell", ['client']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('dinf-uern:shell');
});
