# Flags generation of copies of same-by-value but different-by-reference props (react-redux/mapStateToProps-prefer-hoisted)

Primitives props like strings and numbers are compared by their value, while objects like arrays, dates, and plain objects are compared by their reference.

In case when mapStateToProps creates a new "constant" (i.e. independent of `state` and `ownProps`) object inside of it, React will trigger a re-render of connected component even if actual prop value didn't change.


## Rule details

The following patterns are considered incorrect:

```js
const mapStateToProps = state => {
  return {
    foo: [1, 2, 3] // this array should be defined outside of mapStateToProps
  };
};
```


```js
const mapStateToProps = state => {
  return {
    foo: {  // this object should be defined outside of mapStateToProps
      a: 1
    }
  };
};
```


The following patterns are correct

```js
const mapStateToProps = state => {
  return {
    a: 1
  };
};
```

```js
const mapStateToProps = state => {
  const a = state.a;
  return {
    a
  };
};
```

```js
const mapStateToProps = state => ({
  user: state.user,
  // this is still a bad design because the list prop will be considered
  // updated on every store change but the rule will not flag this.
  list: [1, 2, state.count] 
});
```


## Limitations

Below case wouldn't be flagged by the rule:

```js
const mapStateToProps = state => {
  const foo = [];
  return {
    foo
  };
};
```
