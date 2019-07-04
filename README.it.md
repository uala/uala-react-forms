# Uala React Forms

Official Form binding developed by UALA© frontend team.

Highly flexible and easy to use.

Don't speak english? Try out our README in a different language:

- [Italiano :it:](README.it.md)

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [`connectForm()`](#connectform);
  - [`connectFormElement()`](#connectformelement);
- [License](#license)
- [Collaboration](#collaboration)

## Installation

## Usage

Uala React Forms offers two handful Higher Order Components (aka HOC) to build forms, in a really easy and concise way. Once installed:

1. Build your own form wrapper using the `connectForm()` HOC.

```jsx
import React from 'react';
import { connectForm } from 'uala-react-forms';

const MyForm = ({ children, emitSubmit }) => {
  const submit = e => {
    e.preventDefault();
    e.stopPropagation();

    emitSubmit();
  };

  return (
    <form className="Form" onSubmit={submit}>
      {children}
    </form>
  );
};

export default connectForm()(MyForm);
```

2. Wrap your inputs using the `connectFormElement()` HOC.

```jsx
import React from 'react';
import { connectFormElement } from 'uala-react-forms';

// eslint-disable-next-line react/prop-types
const MyInput = ({ name, emitChange, values }) => {
  return (
    <div className="TextInput">
      <input type="text" defaultValue={values[name]} name={name} onChange={e => emitChange(name, e.target.value)} />
    </div>
  );
};

export default connectFormElement(MyInput);
```

3. You can now build your form using the wrapped components you just defined.

```jsx
import MyForm from './MyForm.js';
import MyInput from './MyInput.js';

const MyFormContainer = () => {
  return (
    <MyForm>
      <MyInput name="firstName" />
      <MyInput name="lastName" />
            
      <input type="submit" value="Submit" />;
    </MyForm>
  );
}

export default MyFormContainer;
```

this approach allows the separation on concerns by moving event handling and dispatching to dedicated containers while keeping the presentation form view clean and as short
as possible.

## API

This section list all the APIs available and possible use case scenarios.

### `connectForm()`

The `connectForm()` function connects the React component you want to use as form wrapper to the form state.

It's also responsible to pass the  `onSubmit()`, `onChange()`, `onBlur()`, `onFocus()` and `onDidChange()` listeners to your component.

#### `connectForm()` Parameters

`connectForm()` accept one parameter, which is a configuration object and it's optional. By convention, the parameter is called `options`, described as shown below:

- [`options?: Object`](#options-object);

```js
{
  schema?: Object,
  schemaVendor?: string,
  validationMode?: string,
  statePropagation?: boolean
}
```
##### `options?: Object`

|Parameter|Type|Default Value|Description|
|----|----|----|----|
|schema|Object|`null`|The validation schema used to validate your form. Default values are used during form initialization.|
|schemaVendor|string|`'yup'`|The name of the schema vendor, (e.g. 'yup', 'joi')|
|validationMode|string|`'onsubmit'`|Define when the form is validated. Allowed values are `'onsubmit','ondidchanged','onchange'`|
|statePropagation|boolean|`false`|Enable the form state propagation, allowing children to access the parent state.|

#### `connectFormElement()`

`connectFormElement()` accept one argument, which is mandatory and it's the component you want to wire. Here's the list of the injected props:

```js
{
  values: Object,
  errors: Object,
  focusedInputKey: string,
  onFocus: Function,
  onChange: Function,
  onBlur: Function,
  onDidChanged: Function,
  onSubmit: Function,
  emitEvent: Function,
  formState: string
}
```

## License

## Collaboration
