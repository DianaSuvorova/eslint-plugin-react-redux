const utils = require('../utils');
const isReactReduxConnect = require('../isReactReduxConnect');

const report = function (context, node) {
  context.report({
    message: 'mapStateToProps should not return complete store object',
    node,
  });
};

// first param name or false for destructuring assignment;
const getFirstParamName = (node) => {
  const firstParam = node.params && node.params[0];
  return firstParam && firstParam.type === 'Identifier' && firstParam.name;
};

const propertyIsStore = (prop, storeName) => {
  if (prop.type === 'Property' && prop.value && prop.value.name === storeName) {
    // state
    return true;
  } else if (
    // ...state
    prop.type === 'SpreadElement'
    && prop.argument && prop.argument.type === 'Identifier'
    && prop.argument.name === storeName
  ) {
    return true;
  }
  return false;
};

const checkFunction = function (context, body, firstParamName) {
  const returnNode = utils.getReturnNode(body);
  // return state;
  if (returnNode && returnNode.type === 'Identifier' && returnNode.name === firstParamName) {
    report(context, body);
  }
  // return {store: state};
  if (returnNode && returnNode.type === 'ObjectExpression' &&
    returnNode.properties.reduce((acc, cv) =>
      (acc || propertyIsStore(cv, firstParamName)), false)
  ) {
    report(context, body);
  }
};

module.exports = function (context) {
  return {
    VariableDeclaration(node) {
      node.declarations.forEach((decl) => {
        if (decl.id && decl.id.name === 'mapStateToProps') {
          const body = decl.init.body;
          const firstParamName = getFirstParamName(decl.init);
          if (firstParamName) {
            checkFunction(context, body, firstParamName);
          }
        }
      });
    },
    FunctionDeclaration(node) {
      if (node.id && node.id.name === 'mapStateToProps') {
        const firstParamName = getFirstParamName(node);
        if (firstParamName) {
          checkFunction(context, node.body, firstParamName);
        }
      }
    },
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        const mapStateToProps = node.arguments && node.arguments[0];
        if (mapStateToProps && mapStateToProps.body) {
          const firstParamName = getFirstParamName(mapStateToProps);
          if (firstParamName) {
            checkFunction(context, mapStateToProps.body, firstParamName);
          }
        }
      }
    },
  };
};
