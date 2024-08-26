const semver = require('semver');
const eslintPkg = require('eslint/package.json');
const { parserOptions } = require('eslint-plugin-import/config/react');

function formatOtions(item) {
    if (semver.major(eslintPkg.version) < 9) {
        return Object.assign({}, { parserOptions: item });
    } 
    const newItem = Object.assign({}, { languageOptions: item })
    if (item.ecmaFeatures) {
        const parserOptions = {
            ecmaFeatures: item.ecmaFeatures
        }
        delete newItem.languageOptions.ecmaFeatures;
        newItem.languageOptions = {
            ...newItem.languageOptions,
            parserOptions
        }

        
    }
    return newItem;
  
  }
module.exports = formatOtions;