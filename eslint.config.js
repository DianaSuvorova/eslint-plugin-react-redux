module.exports = {
  "plugins": {
    "react": require("eslint-plugin-react"),
    "jsx-a11y": require("eslint-plugin-jsx-a11y"),
    "import": require("eslint-plugin-import")
  },
  "rules": {
    "func-names": 0,
    "global-require": 0,
    "prefer-destructuring": 0,
    "strict": 0,
    // Include rules from airbnb configuration directly here
    // Make sure to copy the rules from the airbnb configuration
  },
  "languageOptions": {
    "globals": {
      // Define global variables here for your files
      "mocha": true
    }
  }
};
