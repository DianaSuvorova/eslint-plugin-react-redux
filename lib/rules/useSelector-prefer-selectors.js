function isUseSelector(node, hookNames) {
  return hookNames.includes(node.callee.name);
}

function reportWrongName(context, node, functionName, matching) {
  context.report({
    message: `${node.callee.name} selector "${functionName}" does not match "${matching}".`,
    node,
  });
}

function reportNoSelector(context, node) {
  context.report({
    message: `${node.callee.name} should use a named selector function.`,
    node,
  });
}

module.exports = function (context) {
  const config = context.options[0] || {};
  let hookNames = ['useSelector', 'useAppSelector'];

  // Ensure hookNames is an array
  if (config.hook) {
    hookNames = Array.isArray(config.hook) ? config.hook : [config.hook];
  }

  return {
    CallExpression(node) {
      if (!isUseSelector(node, hookNames)) return;
      const selector = node.arguments && node.arguments[0];
      if (selector && (
        selector.type === 'ArrowFunctionExpression' ||
        selector.type === 'FunctionExpression')
      ) {
        reportNoSelector(context, node);
      } else if (
        selector && selector.type === 'Identifier' &&
        config.matching &&
        !selector.name.match(new RegExp(config.matching))
      ) {
        reportWrongName(context, node, selector.name, config.matching);
      }
    },
  };
};
