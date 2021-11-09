#  Enforces that mapDispatchToProps uses a shorthand method to wrap actions in dispatch calls whenever possible. (react-redux/mapDispatchToProps-prefer-shorthand)

>...`connect` supports an “object shorthand” form for the `mapDispatchToProps` argument: if you pass an object full of action creators instead of a function, `connect` will automatically call bindActionCreators for you internally. We recommend always using the “object shorthand” form of `mapDispatchToProps`, unless you have a specific reason to customize the dispatching behavior.

[source](https://github.com/reduxjs/react-redux/blob/master/docs/using-react-redux/connect-dispatching-actions-with-mapDispatchToProps.md#defining-mapdispatchtoprops-as-an-object)

## Rule details

The following patterns are considered incorrect:

```js
const mapDispatchToProps = (dispatch) => ({
  action: () => dispatch(action())
})
export default connect(null, mapDispatchToProps)(Component)
```

```js
const mapDispatchToProps = (dispatch) => ({
  action: () => dispatch(action()),
  action1: (arg1, arg2) => dispatch(action(arg1, arg2))
})
export default connect(null, mapDispatchToProps)(Component)
```

The following patterns are considered correct:


```js
export default connect(null, { action })(Component)
```

```js
const mapDispatchToProps = { action }
export default connect(null, mapDispatchToProps)(Component)
```

```js
const mapDispatchToProps = (dispatch) => ({
  action: () => dispatch(actionHelper(true))
})
export default connect(null, mapDispatchToProps)(Component)
```

```js
const mapDispatchToProps = (dispatch) => ({
  action: () => dispatch(action()),
  action1: (arg1, arg2) => dispatch(action(arg1 + arg2))
})
export default connect(null, mapDispatchToProps)(Component)
```
