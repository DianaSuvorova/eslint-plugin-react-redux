const findReturnStatement = (node) => {
  if (
    (!node.value || !node.value.body || !node.value.body.body) &&
    (!node.body || !node.body.body)
  ) {
    return false;
  }

  const bodyNodes = (node.value ? node.value.body.body : node.body.body);

  let i = bodyNodes.length - 1;
  for (; i >= 0; i -= 1) {
    if (bodyNodes[i].type === 'ReturnStatement') {
      return bodyNodes[i];
    }
  }
  return false;
};

const getReturnPropertyAndNode = (ASTnode) => {
  let property;
  let node = ASTnode;
  switch (node.type) {
    case 'ReturnStatement':
      property = 'argument';
      break;
    case 'ArrowFunctionExpression':
      property = 'body';
      if (node[property] && node[property].type === 'BlockStatement') {
        node = findReturnStatement(node);
        property = 'argument';
      }
      break;
    default:
      node = findReturnStatement(node);
      property = 'argument';
  }
  return {
    node,
    property,
  };
};


module.exports = {
  getReturnPropertyAndNode,
};
