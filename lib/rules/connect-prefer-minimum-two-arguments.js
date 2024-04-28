const isReactReduxConnect = require('../isReactReduxConnect');

const create = function (context) {
  const report = function (node) {
    context.report({
      message: 'Connect function should have at least 2 arguments.',
      node,
    });
  };

  return {
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        if (node.arguments.length < 2) {
          report(node);
        }
      }
    },
  };
};

module.exports = {
  create,
};
