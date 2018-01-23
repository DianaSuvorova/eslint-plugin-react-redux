'use strict';

const getReturnNode = (node) => {
  const body = node.body;
  if (!body || !body.length) {
    return node;
  }
  for (let i = body.length - 1; i >= 0; i -= 1) {
    if (body[i].type === 'ReturnStatement') {
      return body[i].argument;
    }
  }
  return null;
};

module.exports = {
  getReturnNode,
};
