#  Enforces that all connect parameters have specific names. (react-redux/connect-prefer-named-parameters)

[react-redux connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) function has 4 optional arguments:
* mapStateToProps
* mapDispatchToProps
* mergeProps
* options

This rule enforces that all of the provided parameters should follow the above naming conventions.

## Rule details

The following patterns are considered warnings:

```js
connect(mapStateToProps, actionCreators)(TodoApp)
```

```js
connect(state => state)(TodoApp)
```

The following patterns are considered correct:

```js
connect(mapStateToProps, actionCreators, mergeProps)(TodoApp)
```

```js
connect()(TodoApp)
```
