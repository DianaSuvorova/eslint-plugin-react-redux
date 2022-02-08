const rule = require('../../../lib/rules/connect-prefer-named-arguments');
const RuleTester = require('eslint').RuleTester;
const codeSamples = require('../../code-sanity-samples');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('connect-prefer-named-arguments', rule, {
  valid: [
    ...codeSamples,
    'export default connect(null, mapDispatchToProps)(TodoApp)',
    'connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(Component)',
    'connect(mapStateToProps, mapDispatchToProps)(Component)',
    'connect()(TodoApp)',
  ],
  invalid: [{
    code: 'connect(() => {}, () => {}, mergeProps, options)(Component)',
    errors: [
      {
        message: 'Connect function argument #0 should be named mapStateToProps',
      }, {
        message: 'Connect function argument #1 should be named mapDispatchToProps',
      },
    ],
  }, {
    code: 'connect({}, {})(Component)',
    errors: [
      {
        message: 'Connect function argument #0 should be named mapStateToProps',
      }, {
        message: 'Connect function argument #1 should be named mapDispatchToProps',
      },
    ],
  }, {
    code: 'connect(state => state)(TodoApp)',
    errors: [
      {
        message: 'Connect function argument #0 should be named mapStateToProps',
      },
    ],
  }],
});
