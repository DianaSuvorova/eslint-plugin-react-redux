const report = function (context, node) {
  context.report({
    message: 'mapDispatchToProps should return object',
    node,
  });
};

const checkDeclaration = function (context, node) {
  const init = (
    node.id &&
    node.id.name === 'mapDispatchToProps' &&
    ((node.init && node.init.body) || node.body)
  );
  if (init && context.getSource(init) !== '{}') {
    report(context, node);
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
