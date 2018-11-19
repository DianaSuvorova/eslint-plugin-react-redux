const filterReports = require('../filterReports');
const isReactReduxConnect = require('../isReactReduxConnect');

const filterAllMessage = 'Filter report for all props since mapStateToProps has second argument';
const filterNodeMessage = propName => `${propName} PropType is defined but prop is never used`;

const noUnusedPropTypesReact = require('eslint-plugin-react').rules['no-unused-prop-types'];

const belongsToReduxReact = (node, objectName) => {
  let isReactRedux = false;
  if (node.type === 'VariableDeclaration') {
    node.declarations.forEach((decl) => {
      const name = decl.id && decl.id.name;
      if (name === 'mapStateToProps' || name === 'mapDispatchToProps') {
        const secondArgument = decl.init.params && decl.init.params[1];
        const secondArgumentName = secondArgument && secondArgument.type === 'Identifier' && secondArgument.name;
        if (secondArgumentName === objectName) {
          isReactRedux = true;
        }
      }
    });
  } else if (node.type === 'FunctionDeclaration') {
    const name = node.id && node.id.name;
    if (name === 'mapStateToProps' || name === 'mapDispatchToProps') {
      const secondArgument = node.params && node.params[1];
      const secondArgumentName = secondArgument && secondArgument.type === 'Identifier' && secondArgument.name;
      if (secondArgumentName === objectName) {
        isReactRedux = true;
      }
    }
  } else if (node.type === 'CallExpression') {
    if (isReactReduxConnect(node)) {
      const check = (mapToProps) => {
        if (mapToProps && mapToProps.body) {
          const secondArgument = mapToProps.params && mapToProps.params[1];
          const secondArgumentName = secondArgument && secondArgument.type === 'Identifier' && secondArgument.name;
          if (secondArgumentName === objectName) {
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
      const usedInReactRedux = context.getAncestors().some(ancestor => belongsToReduxReact(ancestor, nodeName));
      if (usedInReactRedux) {
        context.report(node.property.name, node);
      }
    },
  };
};

const filterNode = report =>
  report.message === filterNodeMessage;

const filterAll = report =>
  report.message === filterAllMessage;

module.exports = filterReports([
  propsUsedInRedux,
  noUnusedPropTypesReact,
], filterNode, filterAll);
