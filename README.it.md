# Uala React Forms

Official Form binding developed by UALA© frontend team.

Highly flexible and easy to use.

Don't speak english? Try out our README in a different language:

- [README Italiano :it:](README.it.md)

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

## License

## Collaboration
