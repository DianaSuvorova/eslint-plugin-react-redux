require('babel-eslint');

const rule = require('../../../lib/rules/mapDispatchToProps-prefer-object');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('mapDispatchToProps-prefer-object', rule, {
  valid: [
    'const mapDispatchToProps = {anAction: anAction}',
    'const mapDispatchToProps = () => {}',
    'function mapDispatchToProps () {}',
  ],
  invalid: [{
    code: `const mapDispatchToProps = (dispatch) => (
            {
                requestFilteredItems: (client, keyword) => {
                    dispatch(requestFilteredItems(client, keyword));
                }
            }
        )`,
    errors: [
      {
        message: 'mapDispatchToProps should return object',
      },
    ],
  }],
});
