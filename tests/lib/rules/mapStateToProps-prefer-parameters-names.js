const rule = require('../../../lib/rules/mapStateToProps-prefer-parameters-names');
const RuleTester = require('eslint').RuleTester;
const codeSamples = require('../../code-sanity-samples');
const formatOptions = require('../../util');

const parserOptions = formatOptions({
    ecmaVersion: 2018,
    sourceType: 'module',
});
const ruleTester = new RuleTester(parserOptions);

ruleTester.run('mapStateToProps-prefer-parameters-names', rule, {
  valid: [
    ...codeSamples,
    'const mapStateToProps = ({prop1, prop2}, {ownProp1, ownProp2}) => {}',
    'const mapStateToProps = (state, ownProps) => {}',
    'const mapStateToProps = (state) => {}',
    'const mapStateToProps = (state, ownProps, moreArgs) => {}',
    `import { connect } from 'react-redux'; connect((state) => state, null)(App)`,
    'function mapStateToProps(state, ownProps) {}',
    `import { connect } from 'react-redux'; connect({state}, null)(App)`,
    'const mapStateToProps = {}',
    `import { connect } from 'react-redux'; connect(null, null)(App)`,
    'const mapStateToProps = ({prop1, prop2}, ownProps) => {}',
  ],
  invalid: [{
    code: 'const mapStateToProps = (anyOtherName) => {}',
    errors: [
      {
        message: 'mapStateToProps function parameter #0 should be named state',
      },
    ],
  }, {
    code: 'const mapStateToProps = (anyOtherName, anyOtherName1) => {}',
    errors: [
      {
        message: 'mapStateToProps function parameter #0 should be named state',
      }, {
        message: 'mapStateToProps function parameter #1 should be named ownProps',
      },
    ],
  }, {
    code: `import { connect } from 'react-redux'; connect(function(anyOtherName) {}, null)(App)`,
    errors: [
      {
        message: 'mapStateToProps function parameter #0 should be named state',
      },
    ],
  }],
});
