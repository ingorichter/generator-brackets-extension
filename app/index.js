'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var SMALL = 1, MEDIUM = 2, LARGE = 3;

var BracketsExtensionGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
//        this.installDependencies();
      }
    });

    // options
    this.defaultOptions = {};

    if (this.options['small']) {
      this.defaultOptions.size = SMALL;
    }

    if (this.options['medium']) {
      this.defaultOptions.size = MEDIUM;
    }

    if (this.options['large']) {
      this.defaultOptions.size = LARGE;
    }
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.blue('You\'re using the fantastic Brackets Extension generator.'));

    var prompts = [{
      name: 'extensionName',
      message: 'What do you want to call your extension?',
      default: this.appname
    },
    {
        name: 'title',
        message: 'What should be the title of your extension?',
        default: 'Something great starts here...'
    },
    {
        name: 'description',
        message: 'Describe your extension?',
        default: 'This is an awesome Brackets extension'
    },
    {
        name: 'githubUsername',
        message: 'Author\'s Github username?'
    },
    {
        name: 'homepage',
        message: 'Homepage'
    },
    {
        name: 'authorName',
        message: 'Author\'s name?',
        default: this.user.git.username
    },
    {
        name: 'authorEmail',
        message: 'Author\'s email adress?',
        default: this.user.git.email
    },
    {
        name: 'authorUrl',
        message: 'Author\'s homepage?'
    },
    {
        name: 'version',
        message: 'Version?',
        default: '0.0.1'
    },
    {
        name: 'license',
        message: 'License?',
        type: 'list',
        choices: ['MIT', 'Apache']
    },
    {
        name: 'unitTestSupport',
        message: 'Scaffold unit test support',
        type: 'confirm',
        default: false
    },
    {
        name: 'nlsSupport',
        message: 'Scaffold NLS (l18n) support',
        type: 'confirm',
        default: false
    },
  ];

    this.prompt(prompts, function (props) {
      this.extensionName = props.extensionName;
//      this.underlineExtensionName = this._.range(this.extensionName.length).map(function () { return "="; }).join();

      this.inceptionYear = (new Date()).getFullYear();
      this.repoUrl = 'https://github.com/' + props.githubUsername + '/' + this.extensionName;
      this.props = props;
      this.homepage = (props.homepage) ? props.homepage : this.repoUrl;

      done();
    }.bind(this));
  },

  app: function () {
    // this is always included
    this.copy('_package.json', 'package.json');
    this.copy('main.js', 'main.js');

    if (this.defaultOptions.size > SMALL) {
      this.copy('brackets.json', '.brackets.json');
      this.template('_README.md', 'README.md');
    }

    if (this.defaultOptions.size > MEDIUM) {
      this.copy('travis.yml', '.travis.yml');
    }
  },

  nls: function () {
    if (this.props.nlsSupport) {
      this.mkdir('nls');
      this.mkdir('nls/root');
      this.mkdir('nls/de');

      this.template('nls/root/_strings.js', 'nls/root/strings.js');
      this.template('nls/de/_strings.js', 'nls/de/strings.js');
      this.template('nls/_strings.js', 'nls/strings.js');
      this.template('_strings.js', 'strings.js');
    }
  },

  tests: function () {
    if (this.props.unitTestSupport) {
      this.mkdir('unittest-files');
      this.copy('unittests.js', 'unittests.js');
      this.template('unittest-files/test.json', 'unittest-files/test.json');
    }
  },

  license: function() {
    if (this.defaultOptions.size > SMALL) {
      this.template('_' + this.props.license + '_LICENSE', 'LICENSE');
    }
  },

  projectfiles: function () {
    // this is always included
    this.copy('Gruntfile.js', 'Gruntfile.js');

    if (this.defaultOptions.size > SMALL) {
      this.copy('gitignore', '.gitignore');
      this.copy('gitattributes', '.gitattributes');
    }

    if (this.defaultOptions.size > MEDIUM) {
      this.copy('jshintrc', '.jshintrc');
      this.copy('editorconfig', '.editorconfig');
      this.template('_jsdoc.conf.json', 'jsdoc.conf.json');
      this.copy('requirejs-config.json', 'requirejs-config.json');
    }
  }
});

module.exports = BracketsExtensionGenerator;
