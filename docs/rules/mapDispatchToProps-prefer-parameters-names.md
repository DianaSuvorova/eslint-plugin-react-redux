#  Enforces that all mapDispatchToProps parameters have specific names. (react-redux/mapDispatchToProps-prefer-parameters-names)

[react-redux mapStateToProps](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) function has 2 optional arguments:
* state
* ownProps

This rule enforces that all of the provided parameters should follow the above naming conventions.

## Rule details

The following pattern is considered incorrect:

```js
const mapDispatchToProps = (anyOtherName) => {}
```

```js
connect((state) => state, (anyOtherName) => {})(App)
```

The following patterns are considered correct:

```js
const mapDispatchToProps = () => {}
```

```js
const mapDispatchToProps = (dispatch, ownProps) => {}
```

```js
const mapDispatchToProps = (dispatch, {prop1, prop2}) => {}
```

```js
const mapDispatchToProps = (dispatch) => {}
```

```js
connect((state) => state, (dispatch, ownProps, moreArgs) => {})(App)
```
