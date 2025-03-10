const rule = require('../../../lib/rules/connect-prefer-named-arguments');
const RuleTester = require('eslint').RuleTester;
const codeSamples = require('../../code-sanity-samples');
const formatOptions = require('../../util');

const parserOptions = formatOptions({
    ecmaVersion: 2018,
    sourceType: 'module',
});

const ruleTester = new RuleTester( parserOptions );

ruleTester.run('connect-prefer-named-arguments', rule, {
  valid: [
    ...codeSamples,
    `import { connect } from 'react-redux'; export default connect(null, mapDispatchToProps)(TodoApp)`,
    `import { connect } from 'react-redux'; connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(Component)`,
    `import { connect } from 'react-redux'; connect(mapStateToProps, mapDispatchToProps)(Component)`,
    `import { connect } from 'react-redux'; connect()(TodoApp)`,
    'connect(() => {}, () => {}, mergeProps, options)(Component)',
    'connect({}, {})(Component)',
    'connect(state => state)(TodoApp)',
  ],
  invalid: [{
    code: `import { connect } from 'react-redux'; connect(() => {}, () => {}, mergeProps, options)(Component)`,
    errors: [
      {
        message: 'Connect function argument #1 should be named mapStateToProps',
      }, {
        message: 'Connect function argument #2 should be named mapDispatchToProps',
      },
    ],
  }, {
    code: `import { connect } from 'react-redux'; connect({}, {})(Component)`,
    errors: [
      {
        message: 'Connect function argument #1 should be named mapStateToProps',
      }, {
        message: 'Connect function argument #2 should be named mapDispatchToProps',
      },
    ],
  }, {
    code: `import { connect } from 'react-redux'; connect(state => state)(TodoApp)`,
    errors: [
      {
        message: 'Connect function argument #1 should be named mapStateToProps',
      },
    ],
  }],
});
