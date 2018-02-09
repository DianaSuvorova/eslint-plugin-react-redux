#  Enforces that mapDispatchToProps returns an object. (react-redux/mapDispatchToProps-prefer-object)

In most cases one just needs to pass an object with an actions. And connect wraps it into dispatch function.

[react-redux documentation](https://github.com/reactjs/react-redux/blob/master/docs/api.md#arguments)
> If an object is passed, each function inside it is assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props.

## Rule details

The following pattern is considered incorrect:

```js
const mapDispatchToProps = (dispatch) => dispatch(action())
```

```js
connect((state) => state, (dispatch) => dispatch(action()))(App)
```

```js
const mapDispatchToProps = () => {}
```

The following patterns are considered correct:


```js
const mapDispatchToProps = {anAction: anAction}
```

```js
connect((state) => state, {anAction}))(App)
```
