
const rule = require('../../../lib/rules/mapStateToProps-no-store');
const RuleTester = require('eslint').RuleTester;
const codeSamples = require('../../code-sanity-samples');
const formatOptions = require('../../util');

const parserOptions = formatOptions({
    ecmaVersion: 2018,
    sourceType: 'module',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
    }
});

const ruleTester = new RuleTester( parserOptions );

ruleTester.run('mapStateToProps-no-store', rule, {
  valid: [
    ...codeSamples,
    ` const mapStateToProps = state => ({
       ...getSomeStateFromASelector(state),
       showDefaultHeader: showDefaultHeader(state),
      });
    `,
    ` const mapStateToProps = state => ({
        aField: getSomeStateFromASelector(state),
      });
    `,
    'export default function observeStore(store) {return store;}',
    `import { connect } from 'react-redux'; export default connect(() => {})(Alert)`,
    `import { connect } from 'react-redux'; export default connect(null, null)(Alert)`,
    `import { connect } from 'react-redux'; connect((state) => ({isActive: state.isActive}), null)(App)`,
    `import { connect } from 'react-redux'; connect(null, null)(App)`,
    `import { connect } from 'react-redux';
        connect(
          (state) => {
              return {
                  isActive: state.isActive
              }
          },
          null
        )(App)
    `,
    `import { connect } from 'react-redux';
        connect(function(state){
              return {
                  isActive: state.isActive
              }
          },
          null
        )(App)
    `,
    `function mapStateToProps(state) {
      return {};
    }`,
    `const mapStateToProps = function(state) {
      return state.isActive;
    }`,
    'const mapStateToProps = (state, ownProps) => {}',
    'const mapStateToProps = (state) => {isActive: state.isActive}',
    `import { connect } from 'react-redux';
      const mapStateToProps = (state, ownProps) => {};
      connect(mapStateToProps, null)(Alert);`,
    `const mapStateToProps = ({ header }) => ({
      isLoggedIn: header.user && header.user.isLoggedIn,
    }); `,
    'const mapStateToProps = ({header}, ownProps) => {header};',
    `import { connect } from 'react-redux'; connect(({header}, ownProps) => {header})(App);`,
    `import { connect } from 'react-redux'; connect(({header}, {ownProp1}) => {header, ownProp1})(App);`,
  ],
  invalid: [{
    code: 'const mapStateToProps = (state) => state',
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: `const mapStateToProps = state => {
            return {state: state}
          }`,
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: `function mapStateToProps(state) {
      return state;
    }`,
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: `import { connect } from 'react-redux';
    export default connect(
        (state) => {
            return {
                state: state
            }
        },
        (dispatch) => {
            return {
                actions: bindActionCreators(actions, dispatch)
            }
        }
    )(App)`,
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: `import { connect } from 'react-redux'; connect((state) => state, null)(App)`,
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: `import { connect } from 'react-redux';
      const mapStateToProps = (state, ownProps) => state;
      connect(mapStateToProps, null)(Alert);`,
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: 'const mapStateToProps = state => ({...state});',
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: `import { connect } from 'react-redux'; connect((state) => ({...state}), null)(App)`,
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }],
});
