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
    'mapStateToProps(state, ownProps)',
    'mapStateToProps(state)',
    'mapStateToProps(state, ownProps, moreArgs)',
  ],
  invalid: [{
    code: 'mapStateToProps(anyOtherName)',
    errors: [
      {
        message: 'mapStateToProps function parameter #0 should be named state',
      },
    ],
  }, {
    code: 'mapStateToProps(anyOtherName, anyOtherName)',
    errors: [
      {
        message: 'mapStateToProps function parameter #0 should be named state',
      }, {
        message: 'mapStateToProps function parameter #1 should be named ownProps',
      },
    ],
  }],
});
