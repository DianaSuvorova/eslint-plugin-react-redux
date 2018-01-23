#  Enforces that connect function is provided with at least 2 arguments. (react-redux/connect-prefer-minimum-two-arguments)

[react-redux mapStateToProps](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

> If you do not supply your own mapDispatchToProps function or object full of action creators, the default mapDispatchToProps implementation just injects dispatch into your component’s props.

This rule enforces that the second argument is provided explicitly.

## Rule details

The following pattern is considered incorrect:

```js
connect(mapStateToProps)(Component)
```

The following patterns are considered correct:

```js
connect(mapStateToProps, mapDispatchToProps, mergeProps)(Component)
```

```js
connect(mapStateToProps, mapDispatchToProps)(Component)
```
