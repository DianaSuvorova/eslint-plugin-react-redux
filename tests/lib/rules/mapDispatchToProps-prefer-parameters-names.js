const rule = require('../../../lib/rules/mapDispatchToProps-prefer-parameters-names');
const RuleTester = require('eslint').RuleTester;
const codeSamples = require('../../code-sanity-samples');
const formatOptions = require('../../util');

const parserOptions = formatOptions({
    ecmaVersion: 2018,
    sourceType: 'module',
});

const ruleTester = new RuleTester( parserOptions );

ruleTester.run('mapDispatchToProps-prefer-parameters-names', rule, {
  valid: [
    ...codeSamples,
    'const mapDispatchToProps = (dispatch, ownProps) => {}',
    'const mapDispatchToProps = (dispatch, {prop1, prop2}) => {}',
    'const mapDispatchToProps = (dispatch) => {}',
    'const mapDispatchToProps = (dispatch, ownProps, moreArgs) => {}',
    'const mapDispatchToProps = {anAction: anAction}',
    `import { connect } from 'react-redux'; connect((state) => state, {anAction: anAction})(App)`,
    `import { connect } from 'react-redux'; connect(null, null)(App)`,
    `import { connect } from 'react-redux'; connect((state) => state, (dispatch, ownProps, moreArgs) => {})(App)`,
    `import { connect } from './path/to/connect.js'; connect('something')`,
    `import { connect } from './path/to/connect.js'; connect((state) => state, (anyOtherName) => {})(App)`,
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
    code: `import { connect } from 'react-redux'; connect((state) => state, (anyOtherName) => {})(App)`,
    errors: [
      {
        message: 'mapDispatchToProps function parameter #0 should be named dispatch',
      },
    ],
  }, {
    code: `const { connect } = require('react-redux'); connect((state) => state, (anyOtherName) => {})(App)`,
    errors: [
      {
        message: 'mapDispatchToProps function parameter #0 should be named dispatch',
      },
    ],
  }],
});
