/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('brackets-extension generator', function () {
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
    var expected = [
      // add files you expect to exist here.
      'main.js',
      'package.json'
    ];

    helpers.mockPrompt(this.app, {
      'license': 'MIT'
    });
    this.app.options['skip-install'] = true;
    this.app.options['minimal'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  xit('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      '.gitignore',
      'LICENSE',
      'README.md',
      'Gruntfile.js',
      '.brackets.json',
      '.travis.yml',
      'jsdoc.conf.json',
      'requirejs-config.json'
    ];

    helpers.mockPrompt(this.app, {
      'license': 'MIT'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
