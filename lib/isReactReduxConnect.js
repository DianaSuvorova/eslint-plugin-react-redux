module.exports = function (node, context) {
  if (node.callee.type === 'Identifier' && node.callee.name === 'connect') {
    const sourceCode = context.getSourceCode();
    const scope = sourceCode.getScope(node);
    const variable = scope.variables.find(v => v.name === 'connect');
    if (variable && variable.defs.length > 0) {
      const def = variable.defs[0];
      if (def.type === 'ImportBinding' && def.parent.source.value === 'react-redux') {
        return true;
      }
    }
  }
  return false;
};
