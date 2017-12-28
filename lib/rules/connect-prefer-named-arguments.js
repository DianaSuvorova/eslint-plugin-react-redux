const isReactReduxConnect = require('../isReactReduxConnect');

const argumentNames = [
  'mapStateToProps',
  'mapDispatchToProps',
  'mergeProps',
  'options',
];

const report = function (context, node, i) {
  context.report({
    message: `Connect function argument #${i} should be named ${argumentNames[i]}`,
    node,
  });
};

module.exports = function (context) {
  return {
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
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
