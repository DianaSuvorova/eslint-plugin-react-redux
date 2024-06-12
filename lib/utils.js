'use strict';

const BIND_ACTION_CREATORS_FN_NAME = 'bindActionCreators';

const isObject = node => node && (
  node.type === 'ObjectExpression' || node.type === 'Identifier'
);

const isReturnNodeBindActionCreatorsCall = (node) => {
  if (node.type === 'CallExpression') {
    return node.callee.type === 'Identifier' && node.callee.name === BIND_ACTION_CREATORS_FN_NAME;
  }

  return false;
};

const getReturnNode = (node) => {
  const body = node && node.body;
  if (!body) {
    return node;
  } else if (isObject(body) || body.type === 'CallExpression') {
    return body;
  } else if (body.type === 'BlockStatement') {
    return getReturnNode(body);
  }
  for (let i = body.length - 1; i >= 0; i -= 1) {
    if (body[i].type === 'ReturnStatement') {
      const arg = body[i].argument;
      if (arg && (arg.type === 'ArrowFunctionExpression' || arg.type === 'FunctionExpression')) {
        return getReturnNode(arg);
      }
      return arg;
    }
  }
  return null;
};

module.exports = {
  getReturnNode,
  isObject,
  isReturnNodeBindActionCreatorsCall,
};
