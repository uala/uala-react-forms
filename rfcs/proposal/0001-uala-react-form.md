- Start Date: 2019-06-21
- Contributors: Michele Salvini, Matteo Gatti, Maurizio Vacca

# Summary

An easy and repeatable way to build forms across all the frontend applications managed by the UALA frontend team.

# Basic example

Wrap your input using the HOC provided by the library

```jsx
import { asFormInput } from 'uala/uala-react-form';

const MyInput = ({ name, onChange }) => (
    <input
        type="text"
        id={name}
        name={name}
        onChange={e => onChange(name, !!e.target.checked)}
    />
);

export default asFormInput(MyInput);
```

Then build your form using your wrapped input and the `Form` component.

```jsx
import Form from 'uala/uala-react-form';

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

export default MyForm;
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

TODO

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
