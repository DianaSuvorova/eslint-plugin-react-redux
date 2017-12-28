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
  invalid: [{
    code: 'connect(mapStateToProps, null, mergeProps)(Component)',
    errors: [
      {
        message: 'Connect function should have explicit mapDispatchToProps argument',
      },
    ],
  }, {
    code: 'connect(mapStateToProps, undefined)(Component)',
    errors: [
      {
        message: 'Connect function should have explicit mapDispatchToProps argument',
      },
    ],
  },
  ],
});
