const isReactReduxConnect = require('../isReactReduxConnect');

const report = function (context, node) {
  context.report({
    message: 'mapDispatchToProps should return object',
    node,
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
            report(context, decl);
          }
        }
      });
    },
    FunctionDeclaration(node) {
      if (node.id && node.id.name === 'mapDispatchToProps') {
        report(context, node.body);
      }
    },
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        const mapDispatchToProps = node.arguments && node.arguments[1];
        if (mapDispatchToProps.type === 'ArrowFunctionExpression' ||
        mapDispatchToProps.type === 'FunctionExpression'
        ) {
          report(context, mapDispatchToProps);
        }
      }
    },
  };
};
