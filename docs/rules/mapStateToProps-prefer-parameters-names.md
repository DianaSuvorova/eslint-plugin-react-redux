#  Enforces that all mapStateToProps parameters have specific names. (react-redux/mapStateToProps-prefer-parameters-names)

[react-redux mapStateToProps](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) function has 2 optional arguments:
* state
* ownProps

This rule enforces that all of the provided parameters should follow the above naming conventions.

## Rule details

The following pattern is considered incorrect:

```js
const mapStateToProps = (anyOtherName) => {}
```

```js
connect(function(anyOtherName) {}, null)(App)
```

The following patterns are considered correct:

```js
const mapStateToProps = (state, ownProps) => {}
```

```js
const mapStateToProps = (state) => {}
```

```js
const mapStateToProps = ({isActive}) => {isActive}
```

```js
connect((state) => state, null)(App)
```
