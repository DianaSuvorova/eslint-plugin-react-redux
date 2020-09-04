const rules = {
  'connect-prefer-minimum-two-arguments': require('./lib/rules/connect-prefer-minimum-two-arguments'),
  'connect-prefer-named-arguments': require('./lib/rules/connect-prefer-named-arguments'),
  'mapDispatchToProps-prefer-shorthand': require('./lib/rules/mapDispatchToProps-prefer-shorthand'),
  'mapDispatchToProps-returns-object': require('./lib/rules/mapDispatchToProps-returns-object'),
  'mapDispatchToProps-prefer-parameters-names': require('./lib/rules/mapDispatchToProps-prefer-parameters-names'),
  'mapStateToProps-no-store': require('./lib/rules/mapStateToProps-no-store'),
  'mapStateToProps-prefer-hoisted': require('./lib/rules/mapStateToProps-prefer-hoisted'),
  'mapStateToProps-prefer-parameters-names': require('./lib/rules/mapStateToProps-prefer-parameters-names'),
  'mapStateToProps-prefer-selectors': require('./lib/rules/mapStateToProps-prefer-selectors'),
  'useSelector-prefer-selectors': require('./lib/rules/useSelector-prefer-selectors'),
  'no-unused-prop-types': require('./lib/rules/no-unused-prop-types'),
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
      plugins: ['react-redux'],
      rules: {
        'react-redux/connect-prefer-minimum-two-arguments': 0,
        'react-redux/connect-prefer-named-arguments': 2,
        'react-redux/mapDispatchToProps-prefer-parameters-names': 2,
        'react-redux/mapDispatchToProps-prefer-shorthand': 2,
        'react-redux/mapDispatchToProps-returns-object': 2,
        'react-redux/mapStateToProps-no-store': 2,
        'react-redux/mapStateToProps-prefer-hoisted': 2,
        'react-redux/mapStateToProps-prefer-parameters-names': 2,
        'react-redux/useSelector-prefer-selectors': 2,
        'react-redux/no-unused-prop-types': 2,
        'react-redux/prefer-separate-component-file': 1,
      },
    },
    all: {
      plugins: ['react-redux'],
      rules: activeRulesConfig,
    },
  },
};
