const rules = {
  'connect-prefer-minimum-two-arguments': require('./lib/rules/connect-prefer-minimum-two-arguments'),
  'connect-prefer-named-arguments': require('./lib/rules/connect-prefer-named-arguments'),
  'mapDispatchToProps-prefer-shorthand': require('./lib/rules/mapDispatchToProps-prefer-shorthand'),
  'mapDispatchToProps-returns-object': require('./lib/rules/mapDispatchToProps-returns-object'),
  'mapDispatchToProps-prefer-parameters-names': require('./lib/rules/mapDispatchToProps-prefer-parameters-names'),
  'mapStateToProps-no-store': require('./lib/rules/mapStateToProps-no-store'),
  'mapStateToProps-prefer-hoisted': require('./lib/rules/mapStateToProps-prefer-hoisted'),
  'mapStateToProps-prefer-parameters-names': require('./lib/rules/mapStateToProps-prefer-parameters-names'),
  'prefer-separate-component-file': require('./lib/rules/prefer-separate-component-file'),
};

function configureAsError() {
  const result = {};
  Object.keys(rules).forEach((key) => {
    result[`react-redux/${key}`] = 2;
  });
  return result;
}

const activeRulesConfig = configureAsError();

module.exports = {
  deprecatedRules: [],
  rules,
  configs: {
    recommended: {
      rules: {
        'react-redux/connect-prefer-minimum-two-arguments': 0,
        'react-redux/connect-prefer-named-arguments': 2,
        'react-redux/mapDispatchToProps-prefer-parameters-names': 2,
        'react-redux/mapDispatchToProps-prefer-shorthand': 2,
        'react-redux/mapDispatchToProps-returns-object': 2,
        'react-redux/mapStateToProps-no-store': 2,
        'react-redux/mapStateToProps-prefer-hoisted': 2,
        'react-redux/mapStateToProps-prefer-parameters-names': 2,
        'react-redux/prefer-separate-component-file': 1,
      },
    },
    all: {
      rules: activeRulesConfig,
    },
  },
};
