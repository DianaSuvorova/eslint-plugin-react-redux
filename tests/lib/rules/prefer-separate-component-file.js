require('babel-eslint');

const rule = require('../../../lib/rules/prefer-separate-component-file');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('prefer-separate-component-file', rule, {
  valid: [
    ` import Component from './component';
      connect(mapStateToProps, mapDispatchToProps)(Component)`,
    `const Component = require('./component')
     connect(mapStateToProps, mapDispatchToProps)(Component)`,
    `import {Component} from './component';
       connect(mapStateToProps, mapDispatchToProps)(Component)`,
  ],
  invalid: [{
    code: `const Component = () => {};
          connect(mapStateToProps, null)(Component)`,
    errors: [
      {
        message: 'Connected component should be defined in a separate file.',
      },
    ],
  }],
});
