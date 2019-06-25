- Start Date: 2019-06-21
- Contributors: Michele Salvini, Matteo Gatti, Maurizio Vacca

# Summary

An easy and repeatable way to build forms across all the frontend applications managed by the UALA frontend team.

# Basic example

1. Build your own form wrapper using the `connectForm()` HOC.

```jsx
import { connectForm } from 'uala/uala-react-form';

const MyForm = ({ onSubmit, children }) => <form>{children}</form>;

export default connectForm()(MyForm);
```

2. Wrap your inputs using the `connectFormElement()` HOC.

```jsx
import { connectFormElement } from 'uala/uala-react-form';

const MyInput = ({ name, onChange }) => (
    <input
        type="text"
        id={name}
        name={name}
        onChange={e => onChange(name, e.target.value)}
    />
);

export default connectFormElement(MyInput);
```

3. You can now build your form using the wrapped components you just defined.

```jsx
import MyInput from './MyInput.js'
import MyForm from './MyForm.js'

const MyFormContainer = () => {
    const initialValues = {
        firstName: '',
        lastName: ''
    };

    const handleSubmit({ values }) => { console.log({ ...values })};

    return (
        <Form>
            <MyInput name="firstName" />
            <MyInput name="lastName" />
            
            <input type="submit" />
        </Form>
    );
}

export default MyFormContainer;
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

## API Reference

- [`connectForm()`](#connectform);
- [`connectFormElement()`](#connectformvalues);

### `connectForm()`

The `connectForm()` function connects a the React component you want to use as form wrapper to the form state.

It's also responsible to pass the  `onSubmit()`, `onChange()`, `onBlur()`, `onFocus()` and `onDidChange()` listeners to your component.

#### `connectForm()` Parameters

`connectForm()` accept one parameter, which namely is a configuration object and it's optional. By convention, the parameter is

- `config?: { validation: { schema: Object, vendor: string, mode: string} }`;

##### 

### `connectFormElement()`

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
