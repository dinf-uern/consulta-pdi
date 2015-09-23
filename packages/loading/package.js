Package.describe({
  name: 'dinf-uern:loading',
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
    'templating'
  ]);

  api.addFiles([
    'lib/templates/inline-loading.html',
    'lib/templates/loading.html',
    'lib/stylesheets/inline-loading.css',
    'lib/stylesheets/loading.css'
  ], ['client']);

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('dinf-uern:loading');
});
