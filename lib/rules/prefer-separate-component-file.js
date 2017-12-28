const isReactReduxConnect = require('../isReactReduxConnect');

const report = function (context, node) {
  context.report({
    message: 'Connected component should be defined in a separate file.',
    node,
  });
};

module.exports = function (context) {
  return {
    CallExpression(node) {
      if (isReactReduxConnect(node)) {
        const component =
          node.parent &&
          node.parent.arguments &&
          node.parent.arguments[0];
        if (component) {
          const vars = context.getScope().variables;
          vars.forEach((definedVar) => {
            if (component.name === definedVar.name) {
              definedVar.defs.forEach((def) => {
                if (!(def.type === 'ImportBinding' || context.getSource(def.node).includes('require'))) {
                  report(context, component);
                }
              });
            }
          });
        }
      }
    },
  };
};
