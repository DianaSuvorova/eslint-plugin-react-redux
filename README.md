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
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "react-redux/connect-prefer-named-parameters": 2
    }
}
```

## Supported Rules

* [react-redux/connect-prefer-named-parameters](docs/rules/connect-prefer-named-parameters.md) Enforces that all connect parameters have specific names.
