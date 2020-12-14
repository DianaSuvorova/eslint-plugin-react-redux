require('babel-eslint');

const rule = require('../../../lib/rules/mapStateToProps-prefer-hoisted');
const RuleTester = require('eslint').RuleTester;
const codeSamples = require('../../code-sanity-samples');

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const errorMessage = 'constant arrays and objects should be initialized outside of mapStateToProps';

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('mapStateToProps-prefer-hoisted', rule, {
  valid: [
    ...codeSamples,
    `function mapStateToProps(state) {
      return {};
    }`,
    `const mapStateToProps = state => {
      return {
        a : 1
      };
    };`,
    `const mapStateToProps = state => {
      const a = state.a
      return {
        a
      };
    };`,
    `const mapStateToProps = state => ({
      user: state.user,
      list: [1, 2, state.count]
    });
    `,
    `const mapStateToProps = state => {
      return {
        a: 1,
        b: [state.b, 2]
      };
    };
    `,
    `const mapStateToProps = state => {
      const foo = 'hello';
      return {
        a: 1,
        b: [foo, 2]
      };
    };
    `,
    'export default connect(null, null)(Alert)',
    'connect((state) => ({isActive: state.isActive}), null)(App)',
    'connect(null, null)(App)',
    `connect(
          (state) => {
              return {
                  isActive: state.isActive
              }
          },
          null
        )(App)
    `,
    `connect(function(state){
              return {
                  isActive: state.isActive
              }
          },
          null
        )(App)
    `,
    `const mapStateToProps = function(state) {
      return {
        a: x
      };
    }`,
    'const mapStateToProps = (state, ownProps) => {}',
    'const mapStateToProps = (state) => {set: [1, 2, 3, state.a]}',
    `const mapStateToProps = (state, ownProps) => {};
      connect(mapStateToProps, null)(Alert);`,
    `const mapStateToProps = ({ header }) => ({
      isLoggedIn: header.user && header.user.isLoggedIn,
    }); `,
    'const mapStateToProps = ({header}, ownProps) => {header};',
    'connect(({header}, ownProps) => {header})(App);',
    'connect(({header}, {ownProp1}) => {header, ownProp1})(App);',
    `const mapStateToProps = ({header}, ownProps) => {
      return {
        props: {
          header,
        }
      }
    };`,
    `const createConnectedToolbarItem = (icon, onClick) => {
      const mapStateToProps = { onClick }

      connect(
        null,
        mapStateToProps
      )(createToolbarItem(icon))
    }`,
  ],
  invalid: [{
    code: `const mapStateToProps = (state) => {
      return {
        foo: {
          a: 1
        }
      }
    }`,
    errors: [
      {
        message: errorMessage,
      },
    ],
  }, {
    code: `const mapStateToProps = state => {
            return {
              foo: [1, 2, 3]
            }
          }`,
    errors: [
      {
        message: errorMessage,
      },
    ],
  }, {
    code: `function mapStateToProps(state) {
      return {
        a: []
      };
    }`,
    errors: [
      {
        message: errorMessage,
      },
    ],
  }, {
    code: `export default connect(
        (state) => {
            return {
                a: {
                  z: 1
                }
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
        message: errorMessage,
      },
    ],
  }, {
    code: `const mapStateToProps = state => {
      return {
        a: [1, 2, 3],
      };
    };
    `,
    errors: [
      {
        message: errorMessage,
      },
    ],
  }, {
    code: `function mapStateToProps(state) {
      return {a : {}};
    }`,
    errors: [
      {
        message: errorMessage,
      },
    ],
  }, {
    code: `function mapStateToProps(state) {
      return {
        aProp: state.aProp,
        aConstProp: [1, 2, 3]
      };
    }`,
    errors: [
      {
        message: errorMessage,
      },
    ],
  },
  ],
});
