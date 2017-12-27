const rules = {
  'connect-prefer-named-parameters': require('./lib/rules/connect-prefer-named-parameters'),
  'mapStateToProps-prefer-parameters-names': require('./lib/rules/mapStateToProps-prefer-parameters-names'),
};

module.exports = {
  rules,
  configs: {
    recommended: {
      'react-redux/connect-prefer-named-parameters': 2,
      'react-redux/mapStateToProps-prefer-parameters-names': 2,
    },
    all: {
      rules,
    },
  },
};
