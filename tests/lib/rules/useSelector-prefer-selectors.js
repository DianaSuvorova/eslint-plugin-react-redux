const rule = require('../../../lib/rules/useSelector-prefer-selectors');
const RuleTester = require('eslint').RuleTester;
const codeSamples = require('../../code-sanity-samples');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('useSelector-prefer-selectors', rule, {
  valid: [
    ...codeSamples,
    'const property = useSelector(xSelector)',
    {
      code: 'const property = useSelector(xSelector)',
      options: [{
        matching: '^.*Selector$',
      }],
    },
    {
      code: 'const property = useSelector(getX)',
      options: [{
        matching: '^get.*$',
      }],
    },
    {
      code: 'const property = useSelector(selector)',
      options: [{
        matching: '^selector$',
      }],
    },
  ],
  invalid: [{
    code: 'const property = useSelector((state) => state.x)',
    errors: [
      {
        message: 'useSelector should use a named selector function.',
      },
    ],
  }, {
    code: 'const property = useSelector(function(state) { return state.x })',
    errors: [{
      message: 'useSelector should use a named selector function.',
    }],
  }, {
    code: 'const property = useSelector(xSelector)',
    options: [{
      matching: '^get.*$',
    }],
    errors: [{
      message: 'useSelector selector "xSelector" does not match "^get.*$".',
    }],
  }, {
    code: 'const property = useSelector(getX)',
    options: [{
      matching: '^.*Selector$',
    }],
    errors: [{
      message: 'useSelector selector "getX" does not match "^.*Selector$".',
    }],
  }, {
    code: 'const property = useSelector(selectorr)',
    options: [{
      matching: '^selector$',
    }],
    errors: [{
      message: 'useSelector selector "selectorr" does not match "^selector$".',
    }],
  }],
});
