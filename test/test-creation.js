/*global describe, beforeEach, it, require */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('brackets-extension generator', function () {
  var expectedSmall = [
    'main.js',
    'package.json',
    'Gruntfile.js'
  ];

  var expectedMedium = [
      '.brackets.json',
      '.gitignore',
      '.gitattributes',
      'LICENSE',
      'README.md'
    ];

  expectedSmall.forEach(function (item) { expectedMedium.push(item); });

  var expectedLarge = [
    '.jshintrc',
    '.editorconfig',
    '.travis.yml',
    'jsdoc.conf.json',
    'requirejs-config.json'
  ];

  expectedMedium.forEach(function (item) { expectedLarge.push(item); });

  var expectedUnitTestFiles = [
    'unittest-files/test.json',
    'unittests.js'
  ];

  var expectedNLSFiles = [
    'nls/root/strings.js',
    'nls/de/strings.js',
    'nls/strings.js'
  ];

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('brackets-extension:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates the minimal set of files', function (done) {
    helpers.mockPrompt(this.app, {
      'license': 'MIT'
    });
    this.app.options['skip-install'] = true;
    this.app.options['small'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expectedSmall);
      done();
    });
  });

  it('creates the normal set of files', function (done) {
    helpers.mockPrompt(this.app, {
      'license': 'MIT'
    });
    this.app.options['skip-install'] = true;
    this.app.options['medium'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expectedMedium);
      done();
    });
  });

  it('creates the large set of files', function (done) {
    helpers.mockPrompt(this.app, {
      'license': 'MIT'
    });
    this.app.options['skip-install'] = true;
    this.app.options['large'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expectedLarge);
      done();
    });
  });

  it('creates the small set of files with unit test files', function (done) {
    helpers.mockPrompt(this.app, {
      'license': 'MIT',
      'unitTestSupport': true
    });
    this.app.options['skip-install'] = true;
    this.app.options['small'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expectedSmall);
      helpers.assertFile(expectedUnitTestFiles);
      done();
    });
  });

  it('creates the small set of files with nls files', function (done) {
    helpers.mockPrompt(this.app, {
      'license': 'MIT',
      'nlsSupport': true
    });
    this.app.options['skip-install'] = true;
    this.app.options['small'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expectedSmall);
      helpers.assertFile(expectedNLSFiles);
      done();
    });
  });
});
