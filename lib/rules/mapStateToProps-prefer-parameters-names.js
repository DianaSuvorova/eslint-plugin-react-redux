const isReactReduxConnect = require('../isReactReduxConnect');

const argumentNames = [
  'state',
  'ownProps',
];

const report = function (context, node, i) {
  context.report({
    message: `mapStateToProps function parameter #${i} should be named ${argumentNames[i]}`,
    node,
  });
};

const check = function (context, params) {
  params.forEach((param, i) => {
    if (argumentNames[i] && param.type !== 'ObjectPattern' && argumentNames[i] !== param.name) {
      report(context, param, i);
    }
  });
};

module.exports = function (context) {
  return {
    VariableDeclaration(node) {
      node.declarations.forEach((decl) => {
        if (decl.id && decl.id.name === 'mapStateToProps') {
          if (decl.init && (
            decl.init.type === 'ArrowFunctionExpression' ||
            decl.init.type === 'FunctionExpression'
          )) {
            check(context, decl.init.params);
          }
        }
      });
    },
    FunctionDeclaration(node) {
      if (node.id && node.id.name === 'mapStateToProps') {
        check(context, node.params);
      }
    },
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        const mapStateToProps = node.arguments && node.arguments[0];
        if (mapStateToProps && (
          mapStateToProps.type === 'ArrowFunctionExpression' ||
          mapStateToProps.type === 'FunctionExpression')
        ) {
          check(context, mapStateToProps.params);
        }
      }
    },
  };
};
