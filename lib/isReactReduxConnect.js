module.exports = function (node, context) {
  if (node.callee.type === 'Identifier' && node.callee.name === 'connect') {
    const sourceCode = context.getSourceCode();
    const scope = sourceCode.getScope(node);
    const variable = scope.variables.find(v => v.name === 'connect');
    if (variable && variable.defs.length > 0) {
      const def = variable.defs[0];
      if (
        (def.node.type === 'ImportSpecifier' && def.parent.source.value === 'react-redux') ||
        (def.node.type === 'VariableDeclarator' && def.node.init && def.node.init.callee && def.node.init.callee.name === 'require' && def.node.init.arguments[0].value === 'react-redux')
      ) {
        return true;
      }
    }
  }
  return false;
};
