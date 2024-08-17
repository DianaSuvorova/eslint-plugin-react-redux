const semver = require('semver');
const eslintPkg = require('eslint/package.json');

function formatOtions(item) {
    if (semver.major(eslintPkg.version) < 9) {
        return Object.assign({}, { parserOptions: item });
    }  
    return Object.assign({}, { languageOptions: item });
  
  }
module.exports = formatOtions;