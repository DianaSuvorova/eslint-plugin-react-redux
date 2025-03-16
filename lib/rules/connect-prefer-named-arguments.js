const isReactReduxConnect = require('../isReactReduxConnect');

const argumentNames = [
  'mapStateToProps',
  'mapDispatchToProps',
  'mergeProps',
  'options',
];

const create = function (context) {
  const report = function (node, i) {
    context.report({
      message: `Connect function argument #${i + 1} should be named ${argumentNames[i]}`,
      node,
    });
  };

  return {
    CallExpression(node) {
      if (isReactReduxConnect(node, context)) {
        node.arguments.forEach((argument, i) => {
          if (argument.raw && argument.raw !== 'null') {
            report(node, i);
          } else if (
            !argument.raw
            && argumentNames[i]
            && (!argument.name || argument.name !== argumentNames[i])) {
            report(node, i);
          }
        });
      }
    },
  };
};

module.exports = {
  create,
};
