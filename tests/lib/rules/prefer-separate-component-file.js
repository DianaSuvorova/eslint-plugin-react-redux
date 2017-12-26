require('babel-eslint');

const rule = require('../../../lib/rules/prefer-separate-component-file');
const { RuleTester } = require('eslint');

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
  ],
  invalid: [
    ` const Component = () => {};
      connect(mapStateToProps, null)(Component)`,
  ],
});
