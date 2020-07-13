const isReactReduxConnect = require('../isReactReduxConnect');
const utils = require('../utils');

const reportNoSelector = function (context, node, name) {
  context.report({
    message: `mapStateToProps property "${name}" should use a selector function.`,
    node,
  });
};

const reportWrongName = function (context, node, propName, functionName, matching) {
  context.report({
    message: `mapStateToProps "${propName}"'s selector "${functionName}" does not match "${matching}".`,
    node,
  });
};

const reportUnexpectedParam = function (context, node, propName, functionName, index) {
  context.report({
    message: `mapStateToProps "${propName}"'s selector "${functionName}" parameter #${index} is not expected.`,
    node,
  });
};

const reportInvalidParams = function (context, node, propName, functionName, params, index) {
  context.report({
    message: `mapStateToProps "${propName}"'s selector "${functionName}" parameter #${index} should be "${params[index].name}".`,
    node,
  });
};

const checkProperties = function (context, properties, matching, expectedParams) {
  properties.forEach((prop) => {
    if (prop.value.type !== 'CallExpression') {
      reportNoSelector(context, prop, prop.key.name);
      return;
    }
    if (matching && !prop.value.callee.name.match(new RegExp(matching))) {
      reportWrongName(context, prop, prop.key.name, prop.value.callee.name, matching);
    }
    if (expectedParams) {
      const actualParams = prop.value.arguments;
      const propName = prop.key.name;
      const functionName = prop.value.callee.name;
      actualParams.forEach((param, i) => {
        if (!expectedParams[i]) {
          reportUnexpectedParam(context, prop, propName, functionName, i);
          return;
        }
        if (param.name !== expectedParams[i].name) {
          reportInvalidParams(context, prop, propName, functionName, expectedParams, i);
        }
      });
    }
  });
};

const check = function (context, node, matching, validateParams) {
  const returnNode = utils.getReturnNode(node);
  if (utils.isObject(returnNode)) {
    checkProperties(context, returnNode.properties, matching, validateParams && node.params);
  }
};

module.exports = function (context) {
  const config = context.options[0] || {};
  return {
    VariableDeclaration(node) {
      node.declarations.forEach((decl) => {
        if (decl.id && decl.id.name === 'mapStateToProps') {
          if (decl.init && (
            decl.init.type === 'ArrowFunctionExpression' ||
            decl.init.type === 'FunctionExpression'
          )) {
            check(context, decl.init, config.matching, !(config.validateParams === false));
          }
        }
      });
    },
    FunctionDeclaration(node) {
      if (node.id && node.id.name === 'mapStateToProps') {
        check(context, node.body, config.matching, !(config.validateParams === false));
      }
    },
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        const mapStateToProps = node.arguments && node.arguments[0];
        if (mapStateToProps && (
          mapStateToProps.type === 'ArrowFunctionExpression' ||
          mapStateToProps.type === 'FunctionExpression')
        ) {
          check(context, mapStateToProps, config.matching, !(config.validateParams === false));
        }
      }
    },
  };
};
