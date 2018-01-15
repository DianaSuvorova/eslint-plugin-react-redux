const report = function (context, node) {
  context.report({
    message: 'mapStateToProps should return object',
    node,
  });
};

const checkDeclaration = function (context, node) {
  if (node.id && node.id.name === 'mapStateToProps') {
    const init = ((node.init && node.init.body) || node.body);
    const firstParam = (
      node.init &&
      node.init.params &&
      node.init.params[0] &&
      node.init.params[0].name
    );
    if (init) {
      if (init.type === 'Identifier' && init.name === firstParam) {
        report(context, node);
      }
      debugger;
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
