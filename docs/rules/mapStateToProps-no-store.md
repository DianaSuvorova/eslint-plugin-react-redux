#  Enforces that mapStateToProps does not bind complete store to a component. (react-redux/mapStateToProps-no-store)

Passing whole state to a component is a bd practice. Triggering unnecessary re-renders.
Instead one should provide specific properties used by a component.

## Rule details

The following patterns are considered incorrect:

```js
const mapStateToProps = (state) => state
```

```js
const mapStateToProps = state => {
        return {state: state}
      }
```

```js
connect((state) => state, null)(App)
```

The following patterns are correct:

```js
const mapStateToProps = () => {}
```

```js
const mapStateToProps = (state) => {isActive: state.isActive}
```

```js
connect((state) => ({isActive: state.isActive}), null)(App)
```
