const utils = require('../utils');

const report = function (context, node) {
  context.report({
    message: 'mapStateToProps should not return complete state object',
    node,
  });
};

const checkDeclaration = function (context, node) {
  if (node.id && node.id.name === 'mapStateToProps') {
    const init = (node.init || node.body);
    const returns = utils.getReturnPropertyAndNode(init);
    const firstParam = (
      node.init &&
      node.init.params &&
      node.init.params[0] &&
      node.init.params[0].name
    );
    if (returns.node) {
      if (returns.node[returns.property].type === 'Identifier' && returns.node[returns.property].name === firstParam) {
        report(context, node);
      }
      if (
        returns.node[returns.property].type === 'ObjectExpression' &&
        returns.node[returns.property].properties.reduce((acc, cv) =>
          acc || (cv.value.name === firstParam))
      ) {
        report(context, node);
      }
    }
  }
};

module.exports = function (context) {
  return {
    VariableDeclaration(node) {
      node.declarations.forEach(decl => checkDeclaration(context, decl));
    },
    FunctionDeclaration(node) {
      checkDeclaration(context, node);
    },
  };
};
