const isReactReduxConnect = require('../isReactReduxConnect');
const utils = require('../utils');

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
            const returnNode = utils.getReturnNode(decl.init);
            if (!utils.isObject(returnNode)) {
              report(context, node);
            }
          }
        }
      });
    },
    FunctionDeclaration(node) {
      if (node.id && node.id.name === 'mapDispatchToProps') {
        const returnNode = utils.getReturnNode(node.body);
        if (!utils.isObject(returnNode)) {
          report(context, node);
        }
      }
    },
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        const mapDispatchToProps = node.arguments && node.arguments[1];
        if (mapDispatchToProps && (
          mapDispatchToProps.type === 'ArrowFunctionExpression' ||
          mapDispatchToProps.type === 'FunctionExpression')
        ) {
          const returnNode = utils.getReturnNode(mapDispatchToProps);
          if (!utils.isObject(returnNode)) {
            report(context, node);
          }
        }
      }
    },
  };
};
