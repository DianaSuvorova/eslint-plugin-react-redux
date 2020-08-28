function isUseSelector(node) {
  return node.callee.name === 'useSelector';
}

function reportWrongName(context, node, functionName, matching) {
  context.report({
    message: `useSelector selector "${functionName}" does not match "${matching}".`,
    node,
  });
}

function reportNoSelector(context, node) {
  context.report({
    message: 'useSelector should use a named selector function.',
    node,
  });
}

module.exports = function (context) {
  const config = context.options[0] || {};
  return {
    CallExpression(node) {
      if (!isUseSelector(node)) return;
      const selector = node.arguments && node.arguments[0];
      if (selector && (
        selector.type === 'ArrowFunctionExpression' ||
        selector.type === 'FunctionExpression')
      ) {
        reportNoSelector(context, node);
      } else if (
        selector.type === 'Identifier' &&
        config.matching &&
        !selector.name.match(new RegExp(config.matching))
      ) {
        reportWrongName(context, node, selector.name, config.matching);
      }
    },
  };
};
