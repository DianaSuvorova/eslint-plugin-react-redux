const rules = {
  'connect-prefer-named-parameters': require('./lib/rules/connect-prefer-named-parameters'),
};

module.exports = {
  rules,
  configs: {
    recommended: {
      'react-redux/connect-prefer-named-parameters': 2,
    },
    all: {
      rules,
    },
  },
};
