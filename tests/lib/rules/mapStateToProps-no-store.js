require('babel-eslint');

const rule = require('../../../lib/rules/mapStateToProps-no-store');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('mapStateToProps-no-store', rule, {
  valid: [
    'const mapStateToProps = (state, ownProps) => {}',
    'const mapStateToProps = (state) => {isActive: state.isActive}',
  ],
  invalid: [{
    code: 'const mapStateToProps = (state) => state',
    errors: [
      {
        message: 'mapStateToProps should not return complete state object',
      },
    ],
  }, {
    code: `const mapStateToProps = state => {
            return {state: state}
          }`,
    errors: [
      {
        message: 'mapStateToProps should not return complete state object',
      },
    ],
  }],
});
