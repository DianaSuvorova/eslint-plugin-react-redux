const rule = require('../../../lib/rules/connect-prefer-minimum-two-arguments');
const RuleTester = require('eslint').RuleTester;
const codeSamples = require('../../code-sanity-samples');
const formatOptions = require('../../util');

const parserOptions = formatOptions({
    ecmaVersion: 2018,
    sourceType: 'module',
});

const ruleTester = new RuleTester( parserOptions );

ruleTester.run('connect-prefer-minimum-two-arguments', rule, {
  valid: [
    ...codeSamples,
    `import { connect } from 'react-redux'; connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(Component)`,
    `import { connect } from 'react-redux'; connect(mapStateToProps, mapDispatchToProps)(Component)`,
    `import { connect } from 'react-redux'; connect({prop1, prop2}, {action1, action2})(Component)`,
  ],
  invalid: [{
    code: `import { connect } from 'react-redux'; connect(mapStateToProps)(Component)`,
    errors: [
      {
        message: 'Connect function should have at least 2 arguments.',
      },
    ],
  }],
});
