#  Enforces that mapDispatchToProps returns an object. (react-redux/mapDispatchToProps-returns-object)

Enforces that the mapDispatchToProps is an object or a function returning an object.

*Note: All of the caught cases would have caused a runtime [warning](https://github.com/reactjs/react-redux/blob/master/src/utils/verifyPlainObject.js) by react-redux *  

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
const mapDispatchToProps = {}
```

```js
const mapDispatchToProps = null;
```

```js
const mapDispatchToProps = {anAction: anAction}
```

```js
const mapDispatchToProps = (dispatch) => ({anAction: dispatch(anAction())})
```

## Not supported use cases.

#### mapDispatchToProps is a function but actions are not bound to dispatch

>If a function is passed, it will be given dispatch as the first parameter. It’s up to you to return an object that somehow uses dispatch to bind action creators in your own way.

Below use case is likely not what you want but will not be enforced by this rule nor runtime react-redux check:

```js
const mapDispatchToProps = () => ({
  action
});
```

In this scenario action wouldn't be wrapped in dispatch and thus wouldn't be triggered.

Most likely it needs to be rewritten as:

```js
const mapDispatchToProps = {
  action
};
```
or

```js
const mapDispatchToProps = (dispatch) => ({
  action: () => dispatch(action())
});
```

or

```js
const mapDispatchToProps = (dispatch) => ({
  action: () => bindActionCreators(action, dispatch)
});
```

#### mapDispatchToProps is equal to or returns a variable

Note that if mapDispatchToProps is assigned a value of a variable there is no way for lint to know if the variable resolves to an object.

So both of below use cases will be considered correct by the rule event though the second one is technically incorrect.

This one would be caught by a react-redux check.

```js
const actionsMap = {
  action1,
  action2,
};
const mapDispatchToProps = actionsMap;
```

```js
const mapDispatchToProps = aSingleAction;
```
