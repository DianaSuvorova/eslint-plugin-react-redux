module.exports = {
  "plugins": {
    "react": require("eslint-plugin-react"),
    "jsx-a11y": require("eslint-plugin-jsx-a11y"),
    "import": require("eslint-plugin-import")
  },
  "rules": {
    "func-names": 0,
    "global-require": 0,
    "no-undef": "error",
    "prefer-destructuring": 0,
    "strict": 0,
    // Include rules from airbnb configuration directly here
    // Make sure to copy the rules from the airbnb configuration
  },
  "languageOptions": {
    "globals": {
      __dirname: true,
      console: true,
      describe: true,
      it: true,
      module: true,
      require: true,
    }
  },
};
