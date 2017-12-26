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
    'connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(Component)',
    'connect(mapStateToProps, mapDispatchToProps)(Component)',
  ],
  invalid: [{
    code: 'connect(() => {}, () => {}, mergeProps, options)(Component)',
    errors: [
      {
        message: 'Connect function parameter #0 should be named mapStateToProps',
      }, {
        message: 'Connect function parameter #1 should be named mapDispatchToProps',
      },
    ],
  }, {
    code: 'connect({}, {})(Component)',
    errors: [
      {
        message: 'Connect function parameter #0 should be named mapStateToProps',
      }, {
        message: 'Connect function parameter #1 should be named mapDispatchToProps',
      },
    ],
  },
  ],
});
