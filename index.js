const rules = {
  'connect-prefer-named-parameters': require('./lib/rules/connect-prefer-named-parameters'),
};

module.exports = {
  rules,
  configs: {
    recommended: {
      rules,
    },
    all: {
      rules,
    },
  },
};
