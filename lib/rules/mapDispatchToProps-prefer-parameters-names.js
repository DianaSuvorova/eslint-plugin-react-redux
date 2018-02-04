const isReactReduxConnect = require('../isReactReduxConnect');

const argumentNames = [
  'dispatch',
  'ownProps',
];

const report = function (context, node, i) {
  context.report({
    message: `mapDispatchToProps function parameter #${i} should be named ${argumentNames[i]}`,
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
        if (decl.id && decl.id.name === 'mapDispatchToProps') {
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
      if (node.id && node.id.name === 'mapDispatchToProps') {
        check(context, node.params);
      }
    },
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        const mapDispatchToProps = node.arguments && node.arguments[1];
        if (mapDispatchToProps && (
          mapDispatchToProps.type === 'ArrowFunctionExpression' ||
          mapDispatchToProps.type === 'FunctionExpression')
        ) {
          check(context, mapDispatchToProps.params);
        }
      }
    },
  };
};
