require('babel-eslint');

const rule = require('../../../lib/rules/mapDispatchToProps-prefer-parameters-names');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('mapDispatchToProps-prefer-parameters-names', rule, {
  valid: [
    'const mapDispatchToProps = (dispatch, ownProps) => {}',
    'const mapDispatchToProps = (dispatch) => {}',
    'const mapDispatchToProps = (dispatch, ownProps, moreArgs) => {}',
    'const mapDispatchToProps = {anAction: anAction}',
    'connect((state) => state, {anAction: anAction})(App)',
    'connect((state) => state, (dispatch, ownProps, moreArgs) => {})(App)',
    'function mapDispatchToProps(dispatch, ownProps) {}',

  ],
  invalid: [{
    code: 'const mapDispatchToProps = (anyOtherName) => {}',
    errors: [
      {
        message: 'mapDispatchToProps function parameter #0 should be named dispatch',
      },
    ],
  }, {
    code: 'const mapDispatchToProps = (anyName, anyOtherName) => {}',
    errors: [
      {
        message: 'mapDispatchToProps function parameter #0 should be named dispatch',
      }, {
        message: 'mapDispatchToProps function parameter #1 should be named ownProps',
      },
    ],
  }, {
    code: 'function mapDispatchToProps(anyOtherName) {}',
    errors: [
      {
        message: 'mapDispatchToProps function parameter #0 should be named dispatch',
      },
    ],
  }, {
    code: 'connect((state) => state, (anyOtherName) => {})(App)',
    errors: [
      {
        message: 'mapDispatchToProps function parameter #0 should be named dispatch',
      },
    ],
  }],
});
