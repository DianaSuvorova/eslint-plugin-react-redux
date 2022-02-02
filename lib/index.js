const rules = {
  'connect-prefer-minimum-two-arguments': require('./rules/connect-prefer-minimum-two-arguments'),
  'connect-prefer-named-arguments': require('./rules/connect-prefer-named-arguments'),
  'mapDispatchToProps-prefer-shorthand': require('./rules/mapDispatchToProps-prefer-shorthand'),
  'mapDispatchToProps-returns-object': require('./rules/mapDispatchToProps-returns-object'),
  'mapDispatchToProps-prefer-parameters-names': require('./rules/mapDispatchToProps-prefer-parameters-names'),
  'mapStateToProps-no-store': require('./rules/mapStateToProps-no-store'),
  'mapStateToProps-prefer-hoisted': require('./rules/mapStateToProps-prefer-hoisted'),
  'mapStateToProps-prefer-parameters-names': require('./rules/mapStateToProps-prefer-parameters-names'),
  'mapStateToProps-prefer-selectors': require('./rules/mapStateToProps-prefer-selectors'),
  'useSelector-prefer-selectors': require('./rules/useSelector-prefer-selectors'),
  'no-unused-prop-types': require('./rules/no-unused-prop-types'),
  'prefer-separate-component-file': require('./rules/prefer-separate-component-file'),
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
