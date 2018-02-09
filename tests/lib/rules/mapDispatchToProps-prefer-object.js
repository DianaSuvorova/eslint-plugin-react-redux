require('babel-eslint');

const rule = require('../../../lib/rules/mapDispatchToProps-prefer-object');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('mapDispatchToProps-prefer-object', rule, {
  valid: [
    'const mapDispatchToProps = {...actions}',
    'const mapDispatchToProps = {anAction: anAction}',
    `export default connect(
      state => ({
        productsList: state.Products.productsList,
      }),
      { fetchProducts }
    )(Products);
    `,
    'connect(null, null)(App)',
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
    code: `const mapDispatchToProps = (dispatch) => (
            {
                requestFilteredItems: (client, keyword) => {
                    dispatch(requestFilteredItems(client, keyword));
                }
            }
        )`,
    errors: [
      {
        message: 'mapDispatchToProps should return object',
      },
    ],
  }, {
    code: `function mapDispatchToProps(dispatch) {
              return { requestFilteredItems: (client, keyword) => {
                dispatch(requestFilteredItems(client, keyword));
              }
            }
        }`,
    errors: [
      {
        message: 'mapDispatchToProps should return object',
      },
    ],
  }, {
    code: `const mapDispatchToProps = function(dispatch) {
              return { requestFilteredItems: (client, keyword) => {
                dispatch(requestFilteredItems(client, keyword));
              }
            }
        }`,
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
