const utils = require('../utils');
const isReactReduxConnect = require('../isReactReduxConnect');

const report = function (context, node) {
  context.report({
    message: 'mapStateToProps should not return complete store object',
    node,
  });
};

const getFirstParamName = node =>
  node.params && node.params[0] && node.params[0].name;

const checkFunction = function (context, body, firstParamName) {
  const returnNode = utils.getReturnNode(body);
  // return state;
  if (returnNode && returnNode.type === 'Identifier' && returnNode.name === firstParamName) {
    report(context, body);
  }
  // return {store: state};
  if (returnNode && returnNode.type === 'ObjectExpression' &&
    returnNode.properties.reduce((acc, cv) =>
      acc || (cv.value.name === firstParamName), false)) {
    report(context, body);
  }
};

module.exports = function (context) {
  return {
    VariableDeclaration(node) {
      node.declarations.forEach((decl) => {
        if (decl.id && decl.id.name === 'mapStateToProps') {
          const body = decl.init.body;
          const firxtParamName = decl.init.params &&
                decl.init.params[0] &&
                decl.init.params[0].name;
          checkFunction(context, body, firxtParamName);
        }
      });
    },
    FunctionDeclaration(node) {
      checkFunction(context, node.body, getFirstParamName(node));
    },
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        const mapStateToProps = node.arguments && node.arguments[0];
        if (mapStateToProps.body) {
          checkFunction(context, mapStateToProps.body, getFirstParamName(mapStateToProps));
        }
      }
    },
  };
};
