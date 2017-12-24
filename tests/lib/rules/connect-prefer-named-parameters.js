require('babel-eslint');

const rule = require('../../../lib/rules/connect-prefer-named-parameters');
const { RuleTester } = require('eslint');

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('connect-prefer-named-parameters', rule, {
  valid: [
    'connect(mapStateToProps, mapDispatchToProps, mergeProps, options)',
    'connect(mapStateToProps, mapDispatchToProps)',
  ],
  invalid: [
    'connect(() => {}, () => {}, mergeProps, options)',
    'connect({}, {})',
  ],
});
