const isReactReduxConnect = require('../isReactReduxConnect');
const utils = require('../utils');

const report = function (context, node) {
  context.report({
    message: 'mapDispatchToProps should use a shorthand dispatch wrapping instead',
    node,
  });
};

const getParamsString = (params, context) =>
  params.map(param => context.getSource(param)).join(',');


const propertyCanUseShortHandButDoesnt = (context, prop, dispatchName) => {
  const propName = prop.key && prop.key.name;
  const sourceCode = context.getSource(prop.value).replace(/(\r\n|\n|\r|\t| |;)/gm, '');
  if (prop.value && prop.value.type === 'ArrowFunctionExpression') {
    const fncDef = prop.value;
    const paramString = getParamsString(fncDef.params, context);
    const actionNode = prop.value.body && prop.value.body.arguments && prop.value.body.arguments[0];
    const nameFromSourceCode = actionNode && actionNode.callee && actionNode.callee.name;
    if (sourceCode === `(${paramString})=>${dispatchName}(${nameFromSourceCode}(${paramString}))`) {
      return true;
    }
  } else if (prop.value && prop.value.type === 'FunctionExpression') {
    const fncDef = prop.value;
    const paramString = getParamsString(fncDef.params, context);
    if (sourceCode === `function(${paramString}){return${dispatchName}(${propName}(${paramString}))}`
    ) {
      return true;
    }
  }
  return false;
};

const checkReturnNode = function (context, returnNode, dispatchName) {
  if (returnNode.properties.every(prop =>
    propertyCanUseShortHandButDoesnt(context, prop, dispatchName))
  ) {
    report(context, returnNode);
  }
};


module.exports = function (context) {
  return {
    VariableDeclaration(node) {
      node.declarations.forEach((decl) => {
        if (decl.id && decl.id.name === 'mapDispatchToProps') {
          if (decl.init && (
            decl.init.type === 'ArrowFunctionExpression' ||
            decl.init.type === 'FunctionExpression'
          )) {
            const returnNode = utils.getReturnNode(decl.init);
            if (returnNode && returnNode.type === 'ObjectExpression') {
              checkReturnNode(context, returnNode, 'dispatch');
            }
          }
        }
      });
    },
    FunctionDeclaration(node) {
      if (node.id && node.id.name === 'mapDispatchToProps') {
        const returnNode = utils.getReturnNode(node.body);
        if (returnNode && returnNode.type === 'ObjectExpression') {
          checkReturnNode(context, returnNode, 'dispatch');
        }
      }
    },
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        const mapDispatchToProps = node.arguments && node.arguments[1];
        if (mapDispatchToProps && (
          mapDispatchToProps.type === 'ArrowFunctionExpression' ||
          mapDispatchToProps.type === 'FunctionExpression')
        ) {
          const returnNode = utils.getReturnNode(mapDispatchToProps);
          if (returnNode && returnNode.type === 'ObjectExpression') {
            checkReturnNode(context, returnNode, 'dispatch');
          }
        }
      }
    },
  };
};
