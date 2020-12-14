require('babel-eslint');

const rule = require('../../../lib/rules/mapDispatchToProps-returns-object');
const RuleTester = require('eslint').RuleTester;
const codeSamples = require('../../code-sanity-samples');

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('mapDispatchToProps-returns-object', rule, {
  valid: [
    ...codeSamples,
    'const mapDispatchToProps = {}',
    'const mapDispatchToProps = null',
    'const mapDispatchToProps = actionsMap',
    'const mapDispatchToProps = {...actions}',
    'const mapDispatchToProps = {anAction: anAction}',
    `export default connect(
      state => ({
        productsList: state.Products.productsList,
      }),
      { fetchProducts }
    )(Products);
    `,
    'function mapDispatchToProps () {return {action}}',
    `const mapDispatchToProps = (dispatch) => (
            {
                requestFilteredItems: (client, keyword) => {
                    dispatch(requestFilteredItems(client, keyword));
                }
            }
        )
    `,
    `const mapDispatchToProps = dispatch => ({
      onDoSomething: () => dispatch(toSomethingElse())
    });`,
    `const mapDispatchToProps = function(dispatch) {
          return { requestFilteredItems: (client, keyword) => {
            dispatch(requestFilteredItems(client, keyword));
          }
        }
    }`,
    'connect(null, null)(App)',
    'function mapDispatchToProps () {return aThing}',
    `function mapDispatchToProps(dispatch) {
      return { actions: bindActionCreators(actionCreators, dispatch) }
    }`,
  ],
  invalid: [{
    code: 'function mapDispatchToProps () {}',
    errors: [
      {
        message: 'mapDispatchToProps should return object',
      },
    ],
  }, {
    code: 'const mapDispatchToProps = () => {}',
    errors: [
      {
        message: 'mapDispatchToProps should return object',
      },
    ],
  }, {
    code: `export default connect(
              state => ({
                productsList: state.Products.productsList,
              }),
              dispatch => dispatch(action())
            )(Products);
            `,
    errors: [
      {
        message: 'mapDispatchToProps should return object',
      },
    ],
  }, {
    code: `export default connect(
              state => ({
                productsList: state.Products.productsList,
              }),
              function(dispatch){ return dispatch(action()) }
            )(Products);
            `,
    errors: [
      {
        message: 'mapDispatchToProps should return object',
      },
    ],
  }],
});
