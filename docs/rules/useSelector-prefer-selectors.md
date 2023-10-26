#  Enforces that all useSelector hooks use named selector functions. (react-redux/useSelector-prefer-selectors)

Using selectors in `useSelector` to pull data from the store or [compute derived data](https://redux.js.org/recipes/computing-derived-data#composing-selectors) allows you to decouple your containers from the state architecture and more easily enable memoization. This rule will ensure that every hook utilizes a named selector.

## Rule details

The following pattern is considered incorrect:

```js
const property = useSelector((state) => state.property)
const property = useSelector(function (state) { return state.property })
```

The following patterns are considered correct:

```js
const selector = (state) => state.property

function Component() {
  const property = useSelector(selector)
  // ...
}
```

## Rule Options

```js
...
"react-redux/useSelector-prefer-selectors": [<enabled>, {
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
        "react-redux/useSelector-prefer-selectors": ["error", { matching: "^.*Selector$"}]
    }

    // container.js
    const propertyA = useSelector(aSelector) // success
    const propertyB = useSelector(selectB) // failure
```

```js
    // .eslintrc
    {
        "react-redux/useSelector-prefer-selectors": ["error", { matching: "^get.*FromState$"}]
    }

    // container.js
    const propertyA = useSelector(getAFromState) // success
    const propertyB = useSelector(getB) // failure
```

### `hook`

Sets the name of the `useSelector` function to target. The value can also be an array of strings. Defaults to `['useSelector', 'useAppSelector']`.

```js
    // .eslintrc
{
    "react-redux/useSelector-prefer-selectors": ["error", { hook: 'useAppSelector' }]
}

// container.js
const property = useAppSelector(state => state.mydata) // failure
```
