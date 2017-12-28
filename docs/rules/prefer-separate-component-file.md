#  Enforces that all connected components are defined in a separate file (react-redux/prefer-separate-component-file)

And imports it to the container.

## Rule details

The following pattern is considered incorrect:

```js
const Component = () => {};
connect(mapStateToProps, null)(Component)
```

The following patterns are considered correct:

```js
import Component from './component';
connect(mapStateToProps, mapDispatchToProps)(Component)
```

```js
const Component = require('./component')
connect(mapStateToProps, mapDispatchToProps)(Component)
```
