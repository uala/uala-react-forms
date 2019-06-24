- Start Date: 2019-06-21
- Contributors: Michele Salvini, Matteo Gatti, Maurizio Vacca

# Summary

An easy and repeatable way to build forms across all the frontend applications managed by the UALA frontend team.

# Basic example

Wrap your input using the HOC provided by the library

```jsx
import { asFormItem } from 'uala/uala-react-form';

const MyInput = ({ name, onChange }) => (
    <input
        name={name}
        onChange={e => onChange(name, e.target.value)}
    />
);

export default asFormItem(MyInput);
```

Then build your form using your wrapped input and the `Form` component.

```jsx
import { asForm } from 'uala/uala-react-form';
import schema from './MyForm.schema';

import MyInput from './MyInput.js'

const MyForm = () => {
    const initialValues = {
        firstName: '',
        lastName: ''
    };

    const handleSubmit({ values }) => { console.log({ ...values })};

    return (
        <Form initialValues={initialValues} onSubmit={handleSubmit}>
            <MyInput name="firstName" />
            <MyInput name="lastName" />
            
            <input type="submit" />
        </Form>
    );
}

export default asForm({ schema, schemaType: 'yup' })(MyForm);
```

# Motivation

We aim to provide an easy-to-use, repeatable and clean solution to implement and build forms.

Goals and features we want to achieve and support:

- custom opt-in validation (via either validation schemas like Yup or just validation functions);
- initial/default values;
- custom input components in order to allow virtually any L&F, theme, etc.;
- clean, understandable and short syntax, which includes having as much auto-wiring as possible and usage
of either HOCs (Higher Order Components) or hooks or both whenever we can.
- No UI dependencies :heart:;

# Detailed design

We're going now to give a detailed and in-depth description about use cases, interfaces and integration examples.
We aim to provide in this section the API we'd like to have and how to use them.

Furthermore, we want to be sure that most common patterns and problems are covered, in order to be able to provide
a better estimation time for the actual implementation.

## Components

At the current state, Uala React Forms offers one component, the `Form`, which should be always used as a wrapper on top of your form.

### Form

This the top level wrapper component. It provides validation support, submit handling and much more.

#### Basic Example

```jsx
import React from 'react';

import { asForm } from 'uala/uala-react-form';

const MyForm = () => {
    const initialValues = {
        firstName: '',
        lastName: ''
    };

    const handleSubmit({ values }) => { console.log({ ...values })};

    return (
        <Form initialValues={initialValues} onSubmit={handleSubmit}>
            // several inputs may appear here
            [...]
            <input type="submit" />
        </Form>
    );
}

export default asForm()(MyForm);
```
#### Props

- [`initialValues: Object`](#initialvalues-object);
- [`onSubmit: Function`](#onsubmit-function);
- [`validation?: {schema?: Object, schemaType: 'yup' | 'other' = 'yup', validators: Object}`](#validation-schema-object-schematype-yup--other--yup-validators-object);
- `context?: Object;`

##### `initialValues: Object`

Required. This props is an object representing the initial form state. We expect object to props to have a 1:1 match within the form inputs (matching by name)

##### `onSubmit: Function`

Required. This is the callback invoked after the submit event. Validators and other checks should be consumed and triggered before the callback.

##### `validation?: {schema?: Object, schemaType: 'yup' | 'other' = 'yup', validators: Object}`

Optional. The validation to be applied.

```jsx
import React from 'react';
import validationSchema from './validationSchema';

import { asForm } from 'uala/uala-react-form';

const MyForm = () => {
    const initialValues = {
        firstName: '',
        lastName: ''
    };
    
    // NOTE: We're assuming a YUP schema in this example
    const validation = {
        schema: validationSchema
    };

    const handleSubmit({ values }) => { console.log({ ...values })};

    return (
        <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validation={validation}
        >
            // several inputs may appear here
            [...]
            <input type="submit" />
        </Form>
    );
}

export default asForm()(MyForm);
```

## HOC

TBD.

## Hooks

TBD.

# Drawbacks

Currently, the only possible drawback could be the time required to actually implement the library (needs evaluation though).

# Alternatives

Some libraries we considered which offer similar features;

- [Formik](https://jaredpalmer.com/formik/);
- [Redux Form](https://redux-form.com/8.2.2/);
- [React Hook Form](https://react-hook-form.com/);

# Adoption strategy

We plan to integrate the library with a progressive approach, starting from the new forms.
Then, we'll start to migrate old ones whenever it's possible and accordingly with the scheduled tasks.

# Unresolved questions

- should we support mixed validation? (schema + ad-hoc functions);
