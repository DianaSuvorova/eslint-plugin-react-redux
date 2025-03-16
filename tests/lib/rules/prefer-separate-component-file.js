const rule = require('../../../lib/rules/prefer-separate-component-file');
const RuleTester = require('eslint').RuleTester;
const codeSamples = require('../../code-sanity-samples');
const formatOptions = require('../../util');

const parserOptions = formatOptions({
    ecmaVersion: 2018,
    sourceType: 'module',
});
const ruleTester = new RuleTester(parserOptions);

ruleTester.run('prefer-separate-component-file', rule, {
  valid: [
    ...codeSamples,
    `import { connect } from 'react-redux';
      import Component from './component';
      connect(mapStateToProps, mapDispatchToProps)(Component)`,
    `import { connect } from 'react-redux';
      const Component = require('./component')
      connect(mapStateToProps, mapDispatchToProps)(Component)`,
    `import { connect } from 'react-redux';
      import {Component} from './component';
      connect(mapStateToProps, mapDispatchToProps)(Component)`,
  ],
  invalid: [{
    code: `import { connect } from 'react-redux';
          const Component = () => {};
          connect(mapStateToProps, null)(Component)`,
    errors: [
      {
        message: 'Connected component should be defined in a separate file.',
      },
    ],
  }],
});
