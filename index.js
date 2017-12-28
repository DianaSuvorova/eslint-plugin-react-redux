const rules = {
  'connect-prefer-minimum-two-arguments': require('./lib/rules/connect-prefer-minimum-two-arguments'),
  'connect-prefer-named-arguments': require('./lib/rules/connect-prefer-named-parameters'),
  'mapStateToProps-prefer-parameters-names': require('./lib/rules/mapStateToProps-prefer-parameters-names'),
  'mapDispatchToProps-prefer-parameters-names': require('./lib/rules/mapDispatchToProps-prefer-parameters-names'),

};

module.exports = {
  rules,
  configs: {
    recommended: {
      'react-redux/connect-prefer-minimum-two-arguments': 0,
      'react-redux/connect-prefer-named-arguments': 2,
      'react-redux/mapStateToProps-prefer-parameters-names': 2,
      'react-redux/mapDispatchToProps-prefer-parameters-names': 2,
    },
    all: {
      rules,
    },
  },
};
