Package.describe({
  name: 'liberation:mongo-counter',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Atomic counters stored in MongoDB',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/dolgarev/meteor-mongo-counter',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.6');
  api.use(['ecmascript', 'mongo']);
  api.mainModule('meteor-mongo-counter.js', 'server');
});

Package.onTest(function(api) {
  api.use(['ecmascript', 'mongo', 'tinytest']);
  api.use('liberation:mongo-counter');
  api.mainModule('meteor-mongo-counter-tests.js', 'server');
});
