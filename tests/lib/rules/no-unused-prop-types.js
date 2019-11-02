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
    `export const mapStateToProps = (state, ownProps) => {
      const { myProp } = ownProps;
      return { myData: getMyData(state, myProp)};
    }

    export class MyComponent extends Component {
      render() {
        return <div>{this.props.myData}</div>;
      }
    }

    MyComponent.propTypes = {
      myProp: PropTypes.string.isRequired
    };

    export default connect(mapStateToProps)(MyComponent);`,

    `export const mapStateToProps = (state, ownProps) => {
      const myProp = ownProps.myProp;
      return { myData: getMyData(state, myProp)};
    }

    export class MyComponent extends Component {
      render() {
        return <div>{this.props.myData}</div>;
      }
    }

    MyComponent.propTypes = {
      myProp: PropTypes.string.isRequired
    };

    export default connect(mapStateToProps)(MyComponent);`,

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
    `export const mapStateToProps = (state, {myProp}) => ({
      myData: getMyData(state, myProp.z),
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
    `const selectorFoo = (state) => ({isFetching: false, name: 'Foo', isDeleting: false, deltedId: ''});
    const selectorBar = (state) => ({ isFetching: false, name: 'Bar'});
    export const mapStateToProps = (state) => {
      const { isFetching: isFetchingFoo, ...restFoo } = selectorFoo(state);
      const { isFetching: isFeatchingBar, ...restBar } = selectorBar(state);
      return {
        isFetchingFoo,
        isFetchingBar,
        ...restFoo,
        ...restBar,
      };
    };
      export class MyComponent extends Component {
      render() {
          const {isFetchingFoo, name, isFetchingBar, isDeleting, deletedId} = this.props;
          return (
            <div>
              <span>{isFetchingFoo}</span>
              <span>{isDeleting}</span>
              <span>{isFetchingBar}</span>
              <span>{name}{deletedId}</span>
            </div>
          )
      }
    };

    MyComponent.propTypes = {
      isFetchingFoo: PropTypes.bool.isRequired,
      isDeleting: PropTypes.bool.isRequired,
      deletedId: PropTypes.number.isRequired,
      name: Proptypes.string.isRequired,
      isFetchingBar: PropTypes.bool.isRequired,
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
  }, {
    code: `export const mapStateToProps = ({aState}, ownProps) => ({
      myData: getMyData(aState),
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
    code: `export const mapStateToProps = (state, {myProp}) => ({
      myData: getMyData(state, myProp),
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
  }, {
    code: `export const mapStateToProps = (state, ownProps) => {
      const { myProp } = ownProps;
      return { myData: getMyData(state, myProp)};
    }

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
