#  Enforces that mapDispatchToProps uses a shorthand method to wrap actions in dispatch calls whenever possible. (react-redux/mapDispatchToProps-prefer-shorthand)

>[mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function): If an object is passed, each function inside it is assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props.

[source](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

## Rule details

The following pattern is considered incorrect:

```js
const mapDispatchToProps = (dispatch) => ({
  action: () => dispatch(action())
})

// it should use equivalent shorthand wrapping instead:
// const mapDispatchToProps = {action}
```

```js
const mapDispatchToProps = (dispatch) => ({
  action: () => dispatch(action()),
  action1: (arg1, arg2) => dispatch(action(arg1, arg2))
})
```

The following patterns are considered correct:


```js
const mapDispatchToProps = {action}
```

```js
const mapDispatchToProps = (dispatch) => ({
  action: () => dispatch(actionHelper(true))
})
```

```js
const mapDispatchToProps = (dispatch) => ({
  action: () => dispatch(action()),
  action1: (arg1, arg2) => dispatch(action(arg1 + arg2))
})
```
