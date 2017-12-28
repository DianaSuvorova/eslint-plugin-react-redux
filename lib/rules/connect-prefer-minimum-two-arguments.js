const isReactReduxConnect = require('../isReactReduxConnect');

const report = function (context, node) {
  context.report({
    message: 'Connect function should have at least 2 arguments.',
    node,
  });
};

module.exports = function (context) {
  return {
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        if (node.arguments.length < 2) {
          report(context, node);
        }
      }
    },
  };
};
