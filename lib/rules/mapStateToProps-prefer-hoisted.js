const utils = require('../utils');
const isReactReduxConnect = require('../isReactReduxConnect');

const report = function (context, node) {
  context.report({
    message: 'constant arrays and objects should be initialized outside of mapStateToProps',
    node,
  });
};

const isConstArrayOrObj = (node, nested) => {
  if (node && node.type === 'ObjectExpression') {
    return node.properties.reduce((acc, prop) =>
      (acc && isConstArrayOrObj(prop.value, (nested + 1))), true);
  }
  if (node && node.type === 'ArrayExpression') {
    return node.elements.reduce((acc, el) =>
      (acc && isConstArrayOrObj(el, (nested + 1))), true);
  }
  if (node && node.type === 'Literal' && nested > 0) {
    return true;
  }
  return false;
};

const checkProp = (node, context) => {
  if (isConstArrayOrObj(node, 0)) {
    report(context, node);
  }
};


const checkFunction = function (context, body) {
  const returnNode = utils.getReturnNode(body);
  if (returnNode && returnNode.type === 'ObjectExpression') {
    returnNode.properties.forEach(prop => checkProp(prop.value, context));
  }
};

module.exports = function (context) {
  return {
    VariableDeclaration(node) {
      node.declarations.forEach((decl) => {
        if (decl.id && decl.id.name === 'mapStateToProps') {
          const body = decl.init.body;
          checkFunction(context, body);
        }
      });
    },
    FunctionDeclaration(node) {
      if (node.id && node.id.name === 'mapStateToProps') {
        checkFunction(context, node.body);
      }
    },
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        const mapStateToProps = node.arguments && node.arguments[0];
        if (mapStateToProps && mapStateToProps.body) {
          checkFunction(context, mapStateToProps.body);
        }
      }
    },
  };
};
