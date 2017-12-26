require('babel-eslint');

const rule = require('../../../lib/rules/mapStateToProps-prefer-parameters-names');
const { RuleTester } = require('eslint');

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('mapStateToProps-prefer-parameters-names', rule, {
  valid: [
    'mapStateToProps(state, ownProps)(Component)',
    'mapStateToProps(state)(Component)',
  ],
  invalid: [
    'mapStateToProps(anyOtherName)(Component)',
    'mapStateToProps(anyOtherName, anyOtherName)(Component)',
  ],
});
