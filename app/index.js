'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

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

    if (this.options['simple']) {

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
      default: path.basename(process.cwd())
    },
    {
        name: 'title',
        message: 'What should be the title of your extension?',
        default: 'The best extension ever'
    },
    {
        name: 'description',
        message: 'Describe your extension?',
        default: 'This is an awesome Brackets extension'
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
        name: 'githubUsername',
        message: 'Author\'s Github username?'
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
    }
  ];

    this.prompt(prompts, function (props) {
      this.extensionName = props.extensionName;
//      this.underlineExtensionName = this._.range(this.extensionName.length).map(function () { return "="; }).join();

      this.inceptionYear = (new Date()).getFullYear();
      this.repoUrl = 'https://github.com/' + props.githubUsername + '/' + this.extensionName;
      this.props = props;

      done();
    }.bind(this));
  },

  app: function () {
    this.copy('_package.json', 'package.json');
//    this.copy('_bower.json', 'bower.json');
//    this.copy('brackets.json', '.brackets.json');
//    this.copy('travis.yml', '.travis.yml');

//    this.template('_README.md', 'README.md');

    this.copy('main.js', 'main.js');
  },

  nls: function () {
    // this.mkdir('nls');
    // this.mkdir('nls/root');
    // this.mkdir('nls/de');
    //
    // this.template('nls/root/_strings.js', 'nls/root/strings.js');
    // this.template('nls/de/_strings.js', 'nls/de/strings.js');
    // this.template('nls/_strings.js', 'nls/strings.js');
  },

  tests: function () {
    // this.mkdir('unittest-files');
    // this.copy('unittests.js', 'unittests.js');
  },

  license: function() {
    // this.template('_' + this.props.license + '_LICENSE', 'LICENSE');
  },

  projectfiles: function () {
    // this.copy('editorconfig', '.editorconfig');
    // this.copy('jshintrc', '.jshintrc');
    // this.copy('gitignore', '.gitignore');
    // this.copy('gitattributes', '.gitattributes');
    // this.template('_jsdoc.conf.json', 'jsdoc.conf.json');
    // this.copy('requirejs-config.json', 'requirejs-config.json');
    // this.copy('Gruntfile.js', 'Gruntfile.js');
  }
});

module.exports = BracketsExtensionGenerator;
