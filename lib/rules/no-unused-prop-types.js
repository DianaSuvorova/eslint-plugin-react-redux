const filterReports = require('../filterReports');
const isReactReduxConnect = require('../isReactReduxConnect');

const filterAllMessage = 'Filter report for all props since mapStateToProps has second argument';
const filterNodeMessage = 'TBD: selectively filter error for nodes';

const noUnusedPropTypesReact = require('eslint-plugin-react').rules['no-unused-prop-types'];

const propsUsedInRedux = function (context) {
  return {
    VariableDeclaration(node) {
      node.declarations.forEach((decl) => {
        const name = decl.id && decl.id.name;
        if (name === 'mapStateToProps' || name === 'mapDispatchToProps') {
          const hasSecondArgument = decl.init.params && decl.init.params[1];
          if (hasSecondArgument) {
            context.report(node, filterAllMessage);
          }
        }
      });
    },
    FunctionDeclaration(node) {
      const name = node.id && node.id.name;
      if (name === 'mapStateToProps' || name === 'mapDispatchToProps') {
        const hasSecondArgument = node.params && node.params[1];
        if (hasSecondArgument) {
          context.report(node, filterAllMessage);
        }
      }
    },
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        const mapStateToProps = node.arguments && node.arguments[0];
        const mapDispatchToProps = node.arguments && node.arguments[1];
        if (mapStateToProps && mapStateToProps.body) {
          const hasSecondArgument = mapStateToProps.params && mapStateToProps.params[1];
          if (hasSecondArgument) {
            context.report(node, filterAllMessage);
          }
        }
        if (mapDispatchToProps && mapDispatchToProps.body) {
          const hasSecondArgument = mapDispatchToProps.params && mapDispatchToProps.params[1];
          if (hasSecondArgument) {
            context.report(node, filterAllMessage);
          }
        }
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
