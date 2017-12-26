require('babel-eslint');

const rule = require('../../../lib/rules/prefer-explicit-mapDispatchToProps');
const { RuleTester } = require('eslint');

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('prefer-explicit-mapDispatchToProps', rule, {
  valid: [
    'connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(Component)',
    'connect(mapStateToProps, mapDispatchToProps)(Component)',
  ],
  invalid: [
    'connect(mapStateToProps, null)(Component)',
    'connect(mapStateToProps, undefined)(Component)',
  ],
});
