#  Enforces that all mapStateToProps properties use selector functions. (react-redux/mapStateToProps-prefer-selectors)

Using selectors in `mapStateToProps` to pull data from the store or [compute derived data](https://redux.js.org/recipes/computing-derived-data#composing-selectors) allows you to uncouple your containers from the state architecture and more easily enable memoization. This rule will ensure that every prop utilizes a selector.

## Rule details

The following pattern is considered incorrect:

```js
const mapStateToProps = (state) => { x: state.property }
```

```js
connect(function(state) { 
    return { 
        y: state.other.property
    }
}, null)(App)
```

The following patterns are considered correct:

```js
const propertySelector = (state) => state.property
const mapStateToProps = (state) => { x: propertySelector(state) }
```

```js
const getOtherProperty = (state) => state.other.property
connect(function(state) { 
    return { 
        y: getOtherProperty(state)
    }
}, null)(App)
```

## Rule Options

```js
...
"react-redux/mapStateToProps-prefer-selectors": [<enabled>, {
  "matching": <string>
  "validateParams": <boolean>
}]
...
```

### `matching`
If provided, validates the name of the selector functions against the RegExp pattern provided.

```js
    // .eslintrc
    {
        "react-redux/mapStateToProps-prefer-selectors": ["error", { matching: "^.*Selector$"}]
    }

    // container.js
    const mapStateToProps = (state) => {
        x: xSelector(state), // success
        y: selectY(state), // failure
    }
```

```js
    // .eslintrc
    {
        "react-redux/mapStateToProps-prefer-selectors": ["error", { matching: "^get.*FromState$"}]
    }

    // container.js
    const mapStateToProps = (state) => {
        x: getXFromState(state), // success
        y: getY(state), // failure
    }
```

### `validateParams`
Boolean to determine if the selectors use the correct params (`<selectorFunction>(state, ownProps)`, where both params are optional). Defaults to true.

```js
    // .eslintrc
    {
        "react-redux/mapStateToProps-prefer-selectors": ["error", { validateParams: true }]
    }

    // container.js
    const mapStateToProps = (state, ownProps) => {
        x: xSelector(state), // success
        y: ySelector(state, ownProps), // sucess
        z: zSelector(), // success
        a: aSelector(ownProps, state), // failure
        b: bSelector(state, someOtherValue) // failure
    }
```