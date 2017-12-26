const isReactReduxConnect = require('../isReactReduxConnect');

const argumentNames = [
  'mapStateToProps',
  'mapDispatchToProps',
  'mergeProps',
  'options',
];

const report = function (context, node, i) {
  context.report({
    message: `Connect function parameter #${i} should be named ${argumentNames[i]}`,
    node,
  });
};

module.exports = function (context) {
  return {
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        node.arguments.forEach((argument, i) => {
          if (!argument.name || argument.name !== argumentNames[i]) {
            report(context, node, i);
          }
        });
      }
    },
  };
};
