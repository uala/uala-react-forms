# Uala React Forms

Official Form binding developed by UALA© frontend team.

Highly flexible and easy to use.

Don't speak english? Try out our README in a different language:

- [Italiano :it:](README.it.md)

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://travis-ci.com/uala/uala-react-forms.svg?branch=master
[build]: https://travis-ci.com/uala/uala-react-forms
[npm-badge]: https://img.shields.io/npm/v/@uala/react-forms.png?style=flat-square
[npm]: https://www.npmjs.org/package/@uala/react-forms
[coveralls-badge]: https://img.shields.io/coveralls/uala/uala-react-forms/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/uala/uala-react-forms

What we offer:

- ready-to-use inputs validators + custom validators' setup
- pluggable components for a complete UI customization
- clean code style in components that uses `@uala/react-forms`

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [`connectForm()`](#connectform);
  - [`connectFormElement()`](#connectformelement);
- [Issues](#issues)

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save @uala/react-forms

## Usage

```js
import React from 'react';
import { connectForm, connectFormElement } from '@uala/react-forms';

// import a schema validator
import yupSchema from './schema/yupSchema';

// write your components
const FormComponent = ({ emitSubmit, children }) => <form onSubmit={emitSubmit}>{children}</form>;

const FieldComponent = ({ emitChange, name }) => (
  <input name={name} type="text" onChange={e => emitChange(name, e.target.value)} />
);

// wrap components in @uala/react-forms HOC
const Form = connectForm({ schema: yupSchema, validationMode: 'onchange' })(FormComponent);

const Field = connectFormElement(FieldComponent);

// render
<Form
  onSubmit={({ values }) => {
    /** values validated, do something... */
  }}
>
  <Field name="first_name" />
  <Field name="last_name" />
</Form>;
```
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

## Issues

If you find a bug, please file an issue on [our issue tracker on GitHub](https://github.com/uala/uala-react-forms/issues).
