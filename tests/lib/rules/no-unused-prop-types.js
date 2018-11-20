require('babel-eslint');

const rule = require('../../../lib/rules/no-unused-prop-types');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true,
  },
};


const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('no-unused-prop-types', rule, {
  valid: [
    `export const mapStateToProps = (state, ownProps) => ({
      myData: getMyData(state, ownProps.myProp),
    });

    export class MyComponent extends Component {
      render() {
        return <div>{this.props.myData}</div>;
      }
    }

    MyComponent.propTypes = {
      myProp: PropTypes.string.isRequired
    };

    export default connect(mapStateToProps)(MyComponent);`,

    `export const mapDispatchToProps = (state, ownProps) => ({
      myData: getMyData(state, ownProps.myProp),
    });

    export class MyComponent extends Component {
      render() {
        return <div>{this.props.myData}</div>;
      }
    }

    MyComponent.propTypes = {
      myProp: PropTypes.string.isRequired
    };

    export default connect(mapStateToProps)(MyComponent);`,
  ],
  invalid: [{
    code: `export const mapStateToProps = (state) => ({
      myData: getMyData(state),
    });

    export class MyComponent extends Component {
      render() {
        return <div>{this.props.myData}</div>;
      }
    }

    MyComponent.propTypes = {
      myProp: PropTypes.string.isRequired
    };

    export default connect(mapStateToProps)(MyComponent);`,

    errors: [
      {
        message: '\'myProp\' PropType is defined but prop is never used',
      },
    ],
  }, {
    code: `export const mapStateToProps = (state, ownProps) => ({
      myData: getMyData(state, ownProps.myProp),
    });

    export class MyComponent extends Component {
      render() {
        return <div>{this.props.myData}</div>;
      }
    }

    MyComponent.propTypes = {
      myProp: PropTypes.string.isRequired,
      notUsedProp:  PropTypes.string.isRequired,
    };

    export default connect(mapStateToProps)(MyComponent);`,

    errors: [
      {
        message: '\'notUsedProp\' PropType is defined but prop is never used',
      },
    ],
  }],
});
