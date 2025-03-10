const rule = require('../../../lib/rules/mapStateToProps-prefer-selectors');
const RuleTester = require('eslint').RuleTester;
const codeSamples = require('../../code-sanity-samples');
const formatOptions = require('../../util');

const parserOptions = formatOptions({
    ecmaVersion: 2018,
    sourceType: 'module',
});

const ruleTester = new RuleTester(parserOptions);

ruleTester.run('mapStateToProps-prefer-selectors', rule, {
  valid: [
    ...codeSamples,
    'const mapStateToProps = (state) => 1',
    'const mapStateToProps = (state) => ({})',
    'const mapStateToProps = (state) => ({ x: xSelector(state) })',
    'const mapStateToProps = (state, ownProps) => ({ x: xSelector(state, ownProps) })',
    'const mapStateToProps = (state) => ({ x: xSelector(state), y: ySelector(state) })',
    'const mapStateToProps = (state) => { return { x: xSelector(state) }; }',
    'const mapStateToProps = (state) => { doSomethingElse(); return { x: xSelector(state) }; }',
    'const mapStateToProps = function(state) { return { x: xSelector(state) }; }',
    'function mapStateToProps(state) { doSomethingElse(); return { x: xSelector(state) }; }',
    `import { connect } from 'react-redux'; connect((state) => ({ x: xSelector(state) }), {})(Comp)`,
    'const mapStateToProps = () => ({ x: xSelector() })',
    'const mapStateToProps = function(state) { return { x: getX() }; }',
    'const mapStateToProps = function(state) { return { x: getX(state) }; }',
    `import { connect } from 'react-redux'; connect((state, ownProps) => ({ x: selector() }), {})(Comp)`,
    `import { connect } from 'react-redux'; connect((state, ownProps) => ({ x: selector(state) }), {})(Comp)`,
    `import { connect } from 'react-redux'; connect((state, ownProps) => ({ x: selector(state, ownProps) }), {})(Comp)`,
    {
      code: 'const mapStateToProps = (state) => ({ x: xSelector(state) })',
      options: [{
        matching: '^.*Selector$',
      }],
    },
    {
      code: 'const mapStateToProps = function(state) { return { x: getX(state) }; }',
      options: [{
        matching: '^get.*$',
      }],
    },
    {
      code: `import { connect } from 'react-redux'; connect((state) => ({ x: selector(state) }), {})(Comp)`,
      options: [{
        matching: '^selector$',
      }],
    },
    {
      code: 'const mapStateToProps = (state) => ({ x: xSelector(differentParam) })',
      options: [{
        validateParams: false,
      }],
    },
    {
      code: 'const mapStateToProps = function(state) { return { x: getX(state, ownProps2) }; }',
      options: [{
        validateParams: false,
      }],
    },
    {
      code: `import { connect } from 'react-redux'; connect(() => ({ x: selector(state) }), {})(Comp)`,
      options: [{
        validateParams: false,
      }],
    },
  ],
  invalid: [{
    code: 'const mapStateToProps = (state) => ({ x: state.b })',
    errors: [
      {
        message: 'mapStateToProps property "x" should use a selector function.',
      },
    ],
  }, {
    code: 'const mapStateToProps = (state) => ({ x: state.x, y: state.y })',
    errors: [
      {
        message: 'mapStateToProps property "x" should use a selector function.',
      },
      {
        message: 'mapStateToProps property "y" should use a selector function.',
      },
    ],
  }, {
    code: 'const mapStateToProps = (state) => ({ x: state.x, y: ySelector(state) })',
    errors: [
      {
        message: 'mapStateToProps property "x" should use a selector function.',
      },
    ],
  }, {
    code: 'const mapStateToProps = (state) => { return { x: state.b }; }',
    errors: [
      {
        message: 'mapStateToProps property "x" should use a selector function.',
      },
    ],
  }, {
    code: 'const mapStateToProps = (state) => { doSomethingElse(); return { x: state.b }; }',
    errors: [
      {
        message: 'mapStateToProps property "x" should use a selector function.',
      },
    ],
  }, {
    code: 'const mapStateToProps = function(state) { return { x: state.x }; }',
    errors: [
      {
        message: 'mapStateToProps property "x" should use a selector function.',
      },
    ],
  }, {
    code: 'function mapStateToProps(state) { doSomethingElse(); return { x: state.b }; }',
    errors: [
      {
        message: 'mapStateToProps property "x" should use a selector function.',
      },
    ],
  }, {
    code: `import { connect } from 'react-redux'; connect((state) => ({ x: state.x }), {})(Comp)`,
    errors: [
      {
        message: 'mapStateToProps property "x" should use a selector function.',
      },
    ],
  }, {
    code: 'const mapStateToProps = (state) => ({ x: xSelector(state) })',
    options: [{
      matching: '^get.*$',
    }],
    errors: [{
      message: 'mapStateToProps "x"\'s selector "xSelector" does not match "^get.*$".',
    }],
  }, {
    code: 'const mapStateToProps = function(state) { return { x: getX(state) }; }',
    options: [{
      matching: '^.*Selector$',
    }],
    errors: [{
      message: 'mapStateToProps "x"\'s selector "getX" does not match "^.*Selector$".',
    }],
  }, {
    code: `import { connect } from 'react-redux'; connect((state) => ({ x: selectorr(state) }), {})(Comp)`,
    options: [{
      matching: '^selector$',
    }],
    errors: [{
      message: 'mapStateToProps "x"\'s selector "selectorr" does not match "^selector$".',
    }],
  }, {
    code: 'const mapStateToProps = (state) => ({ x: xSelector(state, ownProps) })',
    errors: [{
      message: 'mapStateToProps "x"\'s selector "xSelector" parameter #1 is not expected.',
    }],
  }, {
    code: 'const mapStateToProps = (state, ownProps) => ({ x: xSelector(state, ownProps, someOtherValue) })',
    errors: [{
      message: 'mapStateToProps "x"\'s selector "xSelector" parameter #2 is not expected.',
    }],
  }, {
    code: 'const mapStateToProps = function(state) { return { x: getX(notState) }; }',
    errors: [{
      message: 'mapStateToProps "x"\'s selector "getX" parameter #0 should be "state".',
    }],
  }, {
    code: `import { connect } from 'react-redux'; connect((state, ownProps) => ({ x: getX(state, notOwnProps) }), {})(Comp)`,
    errors: [{
      message: 'mapStateToProps "x"\'s selector "getX" parameter #1 should be "ownProps".',
    }],
  }, {
    code: `import { connect } from 'react-redux'; connect((state2, ownProps) => ({ x: getX(state) }), {})(Comp)`,
    errors: [{
      message: 'mapStateToProps "x"\'s selector "getX" parameter #0 should be "state2".',
    }],
  }, {
    code: `import { connect } from 'react-redux'; connect((state, ownProps2) => ({ x: getX(state, ownProps) }), {})(Comp)`,
    errors: [{
      message: 'mapStateToProps "x"\'s selector "getX" parameter #1 should be "ownProps2".',
    }],
  }],

});
