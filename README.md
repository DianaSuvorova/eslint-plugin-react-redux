# eslint-plugin-react-redux

Enforcing best practices for react-redux

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-react-redux`:

```
$ npm install eslint-plugin-react-redux --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-react-redux` globally.

## Usage

Add `react-redux` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "react-redux"
    ],
    "extends": [
        "plugin:react-redux/recommended"
    ]
}
```


To configure individual rules:

```json
{
    "rules": {
        "react-redux/connect-prefer-named-arguments": 2
    }
}
```

## Supported Rules

* [react-redux/connect-prefer-minimum-two-arguments](docs/rules/connect-prefer-minimum-two-arguments.md) Enforces that connect function has at least 2 arguments.
* [react-redux/connect-prefer-named-arguments](docs/rules/connect-prefer-named-arguments.md) Enforces that all connect arguments have recommended names.
* [react-redux/mapDispatchToProps-prefer-object](docs/rules/mapDispatchToProps-prefer-object.md) Enforces that mapDispatchToProps returns an object.
* [react-redux/mapDispatchToProps-prefer-parameters-names](docs/rules/mapDispatchToProps-prefer-parameters-names.md)  Enforces that all mapDispatchToProps parameters have specific names.
* [react-redux/mapStateToProps-no-store](docs/rules/mapStateToProps-no-store.md) Prohibits binding a whole store object to a component.
* [react-redux/mapStateToProps-prefer-hoisted](docs/rules/mapStateToProps-prefer-hoisted.md) Flags generation of copies of same-by-value but different-by-reference props.
* [react-redux/mapStateToProps-prefer-parameters-names](docs/rules/mapStateToProps-prefer-parameters-names.md) Enforces that all mapStateToProps parameters have specific names.
* [react-redux/prefer-separate-component-file](docs/rules/prefer-separate-component-file.md) Enforces that all connected components are defined in a separate file.
