'use strict';

const filterReports = require('../filterReports');
const isReactReduxConnect = require('../isReactReduxConnect');

const noUnusedPropTypesReact = require('eslint-plugin-react').rules['no-unused-prop-types'];

const belongsToReduxReact = (node, objectName, destrArg) => {
  const checkProp = (secondArgument) => {
    const secondArgumentName = secondArgument && secondArgument.type === 'Identifier' && secondArgument.name;
    return (secondArgumentName === objectName // ownProps.myProp
      || destrArg === secondArgument // {myProp} in fn argument
      || (destrArg && destrArg.parent.type === 'VariableDeclarator' && destrArg.parent.init && destrArg.parent.init.name === secondArgumentName) // const {myProp} = ownProps;
    );
  };
  let isReactRedux = false;
  if (node.type === 'VariableDeclaration') {
    node.declarations.forEach((decl) => {
      const name = decl.id && decl.id.name;
      if (name === 'mapStateToProps' || name === 'mapDispatchToProps') {
        const secondArgument = decl.init.params && decl.init.params[1];
        if (checkProp(secondArgument)) {
          isReactRedux = true;
        }
      }
    });
  } else if (node.type === 'FunctionDeclaration') {
    const name = node.id && node.id.name;
    if (name === 'mapStateToProps' || name === 'mapDispatchToProps') {
      const secondArgument = node.params && node.params[1];
      if (checkProp(secondArgument)) {
        isReactRedux = true;
      }
    }
  } else if (node.type === 'CallExpression') {
    if (isReactReduxConnect(node)) {
      const check = (mapToProps) => {
        if (mapToProps && mapToProps.body) {
          const secondArgument = mapToProps.params && mapToProps.params[1];
          if (checkProp(secondArgument)) {
            isReactRedux = true;
          }
        }
      };
      const mapStateToProps = node.arguments && node.arguments[0];
      const mapDispatchToProps = node.arguments && node.arguments[1];
      if (mapStateToProps) check(mapStateToProps);
      if (mapDispatchToProps) check(mapDispatchToProps);
    }
  }
  return isReactRedux;
};


const propsUsedInRedux = function (context) {
  return {
    MemberExpression(node) {
      const nodeName = node.object.name;
      const usedInReactRedux = context.getAncestors()
        .some(ancestor => belongsToReduxReact(ancestor, nodeName));
      if (usedInReactRedux) {
        context.report(node, `exclude:${node.property.name}`);
      }
    },
    ObjectPattern(node) {
      const usedInReactRedux = context.getAncestors()
        .some(ancestor => belongsToReduxReact(ancestor, null, node));
      if (usedInReactRedux) {
        node.properties.forEach((prop) => {
          if (prop.type === 'Property' && prop.key && prop.key.name) {
            return context.report(node, `exclude:${prop.key.name}`);
          } else if (prop.type === 'ExperimentalRestProperty' && prop.argument && prop.argument.name) {
            return context.report(node, `exclude:${prop.argument.name}`);
          }
          return undefined;
        });
      }
    },
  };
};

const getPropNameFromReactRuleMessage = message => message.replace(' PropType is defined but prop is never used', '').replace("'", '').replace("'", '');
const getPropNameFromReduxRuleMessage = message => message.replace('exclude:', '');

module.exports = filterReports([
  propsUsedInRedux,
  noUnusedPropTypesReact,
], getPropNameFromReactRuleMessage, getPropNameFromReduxRuleMessage);
