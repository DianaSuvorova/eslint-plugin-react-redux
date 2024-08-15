const isReactReduxConnect = require('../isReactReduxConnect');

const report = function (context, node) {
  context.report({
    message: 'Connected component should be defined in a separate file.',
    node,
  });
};

module.exports = {
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();
    return {
      CallExpression(node) {
        if (isReactReduxConnect(node)) {
          const component =
            node.parent &&
            node.parent.arguments &&
            node.parent.arguments[0];
          if (component) {
            const vars = sourceCode.getScope(component).variables;
            vars.forEach((definedVar) => {
              if (component.name === definedVar.name) {
                definedVar.defs.forEach((def) => {
                  if (!(def.type === 'ImportBinding' || sourceCode.getText(def.node).includes('require'))) {
                    report(context, component);
                  }
                });
              }
            });
          }
        }
      },
    };
  },
};
