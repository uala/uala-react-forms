# @uala/react-forms

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://travis-ci.com/uala/uala-react-forms.svg?branch=master
[build]: https://travis-ci.com/uala/uala-react-forms
[npm-badge]: https://img.shields.io/npm/v/@uala/react-forms.png?style=flat-square
[npm]: https://www.npmjs.org/package/@uala/react-forms
[coveralls-badge]: https://img.shields.io/coveralls/uala/uala-react-forms/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/uala/uala-react-forms

## Installation

- ready-to-use inputs validators + custom validators' setup
- pluggable components for a complete UI customization
- clean code style in components that uses `@uala/react-forms`

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

## Issues

If you find a bug, please file an issue on [our issue tracker on GitHub](https://github.com/uala/uala-react-forms/issues).

### README languages

- [English](README.md)
- [Italiano](README.it.md)
