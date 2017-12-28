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

const checkDeclaration = function (context, node) {
  if (node.id && node.id.name === 'mapDispatchToProps'
    && node.init && node.init.params
  ) {
    node.init.params.forEach((param, i) => {
      if (argumentNames[i] && argumentNames[i] !== param.name) {
        report(context, param, i);
      }
    });
  }
};

module.exports = function (context) {
  return {
    VariableDeclaration(node) {
      node.declarations.forEach(decl => checkDeclaration(context, decl));
    },
  };
};
