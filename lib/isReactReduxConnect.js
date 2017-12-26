module.exports = function (node) {
  return (
    node.callee.name === 'connect'
    && node.parent
    && node.parent.type === 'CallExpression'
    && node.parent.arguments.length === 1
  );
};
