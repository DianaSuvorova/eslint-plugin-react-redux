require('babel-eslint');

const rule = require('../../../lib/rules/mapDispatchToProps-returns-object');
const RuleTester = require('eslint').RuleTester;

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

ruleTester.run('mapDispatchToProps-returns-object-allowReturnBindFn', rule, {
  valid: [
    {
      options: [{ allowReturnBindFn: true }],
      code: `function mapDispatchToProps(dispatch) {
        return bindActionCreators(
          {
            requestFilteredItems,
            showAlert: showAlertAction,
          },
          dispatch
        );
      }`,
    },
    {
      options: [{ allowReturnBindFn: true }],
      code: `const mapDispatchToProps = (dispatch) => {
        return bindActionCreators(
          {
            requestFilteredItems,
            showAlert: showAlertAction,
          },
          dispatch
        );
      }`,
    },
    {
      options: [{ allowReturnBindFn: true }],
      code: `const mapDispatchToProps = (dispatch) =>
        bindActionCreators(
          {
            requestFilteredItems,
            showAlert: showAlertAction,
          },
          dispatch
        );
      `,
    },
    {
      options: [{ allowReturnBindFn: true }],
      code: `export default connect(
        state => ({
          productsList: state.Products.productsList,
        }),
        function (dispatch) {
          return bindActionCreators(
            {
              requestFilteredItems,
              showAlert: showAlertAction,
            },
            dispatch
          )
        }
      )(Products);`,
    },
    {
      options: [{ allowReturnBindFn: true }],
      code: `export default connect(
        state => ({
          productsList: state.Products.productsList,
        }),
        (dispatch) => {
          return bindActionCreators(
            {
              requestFilteredItems,
              showAlert: showAlertAction,
            },
            dispatch
          )
        }
      )(Products);`,
    },
    {
      options: [{ allowReturnBindFn: true }],
      code: `export default connect(
        state => ({
          productsList: state.Products.productsList,
        }),
        (dispatch) =>
          bindActionCreators(
            {
              requestFilteredItems,
              showAlert: showAlertAction,
            },
            dispatch
          )
      )(Products);`,
    },
  ],
  invalid: [],
});
