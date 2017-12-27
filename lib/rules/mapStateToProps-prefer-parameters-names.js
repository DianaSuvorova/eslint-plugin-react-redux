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

module.exports = function (context) {
  return {
    CallExpression(node) {
      if (node.callee.name === 'mapStateToProps') {
        node.arguments.forEach((argument, i) => {
          if (argument.raw && argument.raw !== 'null') {
            report(context, node, i);
          } else if (
            !argument.raw
            && argumentNames[i]
            && (!argument.name || argument.name !== argumentNames[i])) {
            report(context, node, i);
          }
        });
      }
    },
  };
};
