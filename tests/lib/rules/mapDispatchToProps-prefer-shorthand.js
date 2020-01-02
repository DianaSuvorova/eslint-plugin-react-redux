require('babel-eslint');

const rule = require('../../../lib/rules/mapDispatchToProps-prefer-shorthand');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('mapDispatchToProps-prefer-shorthand', rule, {
  valid: [
    'function mapDispatchToProps () {return {action}}',
    `const mapDispatchToProps = dispatch => ({
      onDoSomething: function() {return dispatch(toDo())},
      action2: (arg1, arg2) => dispatch(action2(arg1, arg2)),
    });`,
    `const mapDispatchToProps = dispatch => ({
      onDoSomething: () => dispatch(onDoSomething()),
      action2: (arg1, arg2) => dispatch(action2(arg1 + arg2)),
    });`,
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
    'connect(null, null)(App)',
    'function mapDispatchToProps () {return aThing}',
  ],
  invalid: [{
    code: `const mapDispatchToProps = dispatch => ({
      onDoSomething: () => dispatch(onDoSomething()),
      action1: () => dispatch(action1()),
      action2: (arg1, arg2) => dispatch(action2(arg1, arg2)),
    });`,
    errors: [
      {
        message: 'mapDispatchToProps should use a shorthand dispatch wrapping instead',
      },
    ],
  }, {
    code: `const mapDispatchToProps = dispatch => ({
      onDoSomething: function() {return dispatch(onDoSomething())}
    });`,
    errors: [
      {
        message: 'mapDispatchToProps should use a shorthand dispatch wrapping instead',
      },
    ],
  }, {
    code: `const mapDispatchToProps = function(dispatch) {
              return { requestFilteredItems: (client, keyword) =>
                dispatch(requestFilteredItems(client, keyword))
            };
        }`,
    errors: [
      {
        message: 'mapDispatchToProps should use a shorthand dispatch wrapping instead',
      },
    ],
  }, {
    code: `const mapDispatchToProps = dispatch => ({
      onDoSomething: () => dispatch(toSomethingElse()),
    });`,
    errors: [
      {
        message: 'mapDispatchToProps should use a shorthand dispatch wrapping instead',
      },
    ],
  }],
});
