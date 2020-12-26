# :clipboard: DirectForm

A simple way to modify complex data with react forms

[![npm](https://img.shields.io/npm/dt/react-directform)](https://www.npmjs.com/package/react-directform)
[![npm](https://img.shields.io/npm/v/react-directform)](https://www.npmjs.com/package/react-directform)
[![NPM](https://img.shields.io/npm/l/react-directform)](https://www.npmjs.com/package/react-directform)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/yhaering/react-directform/Continues%20Integration)
[![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/react-directform/latest)](https://bundlephobia.com/result?p=react-directform@latest)
[![Maintainability](https://api.codeclimate.com/v1/badges/d01900bcdd97d166f417/maintainability)](https://codeclimate.com/github/yhaering/react-directform/maintainability)

## Install

```
npm install react-directform
```

## Quickstart

```typescript jsx
import React, { useState } from 'react';
import { DirectForm } from 'react-directform';
import { object, string } from 'yup';

function App() {
  const [value, setValue] = useState();

  const schema = object().schema({
    firstname: string().required('First name is required'),
    lastname: string().required('Last name is required'),
  });

  return (
    <DirectForm schema={schema} value={value} onSubmit={setValue}>
      {({ register, submit, getError }) => (
        <form onSubmit={submit}>
          <input {...register('firstname')} />
          {getError('firstname')}
          <input {...register('lastname')} />
          {getError('lastname')}
          <input type={'submit'} />
        </form>
      )}
    </DirectForm>
  );
}
```

## Usage Guide

The intentions behind creating this library were, to keep everything as near as possible to the react standard toolset.
This means, that this library does not use states outside react or interfere with form fields directly. This may seem as
a waste of performance at first but highly increases the overall compatibility with common component frameworks.

### Concept

Using this library is as easy as one-two-three. The `DirectForm` component has a single required property
called `value` which includes the initial state of the form. As soon as the form gets submitted, the `onSubmit`
event callback gets triggered and can be used to update the state containing the value object as shown in the example
below.

```typescript jsx
import { DirectForm } from "./DirectForm";

function App() {
  const [value, setValue] = useState({ firstname: 'Max', lastname: 'Mustermann' });

  return (
    <DirectForm value={value} onSubmit={setValue}>
      {({ getValue, setValue, submit }) => (
        ...
        )}
    </DirectForm>
  );
}
```

#### Manually adding input fields

To add an input field to the form, just assign the corresponding methods to the input events.

```typescript jsx
import { DirectForm } from "./DirectForm";

function App() {
  const [value, setValue] = useState({ firstname: 'Max', lastname: 'Mustermann' });

  return (
    <DirectForm value={value} onSubmit={setValue}>
      {({ getValue, setValue, submit }) => (
        <input name={'firstname'} onChange={(e) => setValue('firstname', e.target.value)}
               value={getValue('firstname')} />
        <input name={'lastname'} onChange={(e) => setValue('lastname', e.target.value)} value={getValue('lastname')} />
        <button onClick={submit}>Submit</button>
        )}
    </DirectForm>
  );
}
```

#### Register fields automatically

In the majority of cases the pattern of assigning `setValue` to `onChange` and `getValue` to `value` is used.
That's exactly what the `register` method is doing behind the scenes. It also sets the name of the input the fields
values name.

```typescript jsx
import { DirectForm } from "./DirectForm";

function App() {
  const [value, setValue] = useState({ firstname: 'Max', lastname: 'Mustermann' });

  return (
    <DirectForm value={value} onSubmit={setValue}>
      {({ register, submit }) => (
        <input {...register('firstname')} />
        <input {...register('lastname')} />
        <button onClick={submit}>Submit</button>
        )}
    </DirectForm>
  );
}
```

#### Validation

To validate the form to ensure, that the value returned by the `onSubmit` handler is always valid, you can use
a [Yup](https://github.com/jquense/yup) validation schema. If the schema fails to validate the form, `getError` will
result in the corresponding error message.

```typescript jsx
import React, { useState } from 'react';
import { DirectForm } from 'react-directform';
import { object, string } from 'yup';

function App() {
  const [value, setValue] = useState();

  const schema = object().schema({
    firstname: string().required('First name is required'),
    lastname: string().required('Last name is required'),
  });

  return (
    <DirectForm schema={schema} value={value} onSubmit={setValue}>
      {({ register, submit, getError }) => (
        <form onSubmit={submit}>
          <input {...register('firstname')} />
          {getError('firstname')}
          <input {...register('lastname')} />
          {getError('lastname')}
          <input type={'submit'} />
        </form>
      )}
    </DirectForm>
  );
}
```

#### Access form from hook

It is possible to access all methods of the form using the `useDirectForm` hook.

```typescript jsx
import React, { useState } from 'react';
import { DirectForm, useDirectForm } from 'react-directform';
import { object, string } from 'yup';

function PersonForm() {
  const { register, getError } = useDirectForm();
  return (
    <>
      <input {...register('firstname')} />
      {getError('firstname')}
      <input {...register('lastname')} />
      {getError('lastname')}
    </>
  );
}

function App() {
  const [value, setValue] = useState();

  const schema = object().schema({
    firstname: string().required('First name is required'),
    lastname: string().required('Last name is required'),
  });

  return (
    <DirectForm schema={schema} value={value} onSubmit={setValue}>
      {({ register, submit, getError }) => (
        <form onSubmit={submit}>
          <PersonForm />
          <input type={'submit'} />
        </form>
      )}
    </DirectForm>
  );
}
```

#### Custom register method

The default behaviour of the `register` method is to assign the correct values to `onChange`, `value`, `onBlur`
and `name` of the input field. For some component libraries this may not be the correct assignment or additional
fields need to be mapped. This can by either not using register at all or assigning a custom register method as shown
below for Material-UI.

```typescript jsx
import React, { useState } from 'react';
import { DirectForm } from 'react-directform';
import { object, string } from 'yup';
import { TextField } from '@material-ui/core';

function App() {
  const [value, setValue] = useState();

  const schema = object().schema({
    firstname: string().required('First name is required'),
    lastname: string().required('Last name is required'),
  });

  // Custom register method to add the validation errors to material ui TextFields
  function register(ctx: DirectFormContextData<any>, org: DirectFormContextData<any>['register']) {
    return (path: string, value?: 'value' | 'checked') => ({
      ...org(path, value),
      error: !!ctx.getError(path),
      helperText: ctx.getError(path),
    });
  }

  return (
    <DirectForm customRegister={register} schema={schema} value={value} onSubmit={setValue}>
      {({ register, submit, getError }) => (
        <form onSubmit={submit}>
          <TextField {...register('firstname')} />
          {getError('firstname')}
          <TextField {...register('lastname')} />
          {getError('lastname')}
          <input type={'submit'} />
        </form>
      )}
    </DirectForm>
  );
}
```

#### Global form settings

You can assign specific config options to all `DirectForm` components by providing them with
the `DirectFormSettings` component.

```typescript jsx
import React, { useState } from 'react';
import { DirectForm, DirectFormSettings } from 'react-directform';
import { object, string } from 'yup';
import { TextField } from '@material-ui/core';

function App() {
  const [value, setValue] = useState();

  const schema = object().schema({
    firstname: string().required('First name is required'),
    lastname: string().required('Last name is required'),
  });

  // Custom register method to add the validation errors to material ui TextFields
  function register(ctx: DirectFormContextData<any>, org: DirectFormContextData<any>['register']) {
    return (path: string, value?: 'value' | 'checked') => ({
      ...org(path, value),
      error: !!ctx.getError(path),
      helperText: ctx.getError(path),
    });
  }

  return (
    <DirectFormSettings customRegister={register}>
      <DirectForm schema={schema} value={value} onSubmit={setValue}>
        ...
      </DirectForm>
      <DirectForm schema={schema} value={value} onSubmit={setValue}>
        ...
      </DirectForm>
    </DirectFormSettings>
  );
}
```

#### Deep object creation

This library is specifically useful if you need to create complex objects. All method which allow a property name as a
parameter support the common object path syntax.

```typescript jsx
import { DirectForm } from "./DirectForm";

function App() {
  const [value, setValue] = useState({
    person: { firstname: 'Max', lastname: 'Mustermann' }
  });

  return (
    <DirectForm value={value} onSubmit={setValue}>
      {({ getValue, register, submit }) => (
        <input {...register('person.firstname')} />
        <input {...register('person.lastname')} />
        <button onClick={submit}>Submit</button>
        )}
    </DirectForm>
  );
}
```

#### Dynamic lists

As all functions allow the object path syntax, it is also easily possible to create lists.

```typescript jsx
import { DirectForm } from "./DirectForm";

function App() {
  const [value, setValue] = useState({
    person: { firstname: 'Max', lastname: 'Mustermann' },
    estates: [{ price: 10000 }, { price: 20000 }]
  });

  return (
    <DirectForm value={value} onSubmit={setValue}>
      {({ getList, register, submit }) => (
        <input {...register('person.firstname')} />
        <input {...register('person.lastname')} />
        {getList('estates').map((data, index) => (
          <input {...register(`estates[${index}].price`)} />
        ))}
        <button onClick={submit}>Submit</button>
        )}
    </DirectForm>
  );
}
```

#### Nested Forms

It's also possible to create nested forms to validate subsets of the data or allow partial submits. This can be especially useful when the path to the field is not static, or the form can be used with different data structures as demonstrated below. The `registerForm` method is similar to the `register` method used for fields. It automatically sets the `value` property of the `DirectForm` component to the `getValue` method of the parent form and the `onSubmit` method to the `setValue` method. This way the sub form does not have to know the static path to `zip`, `city` and `street` as from its point of view the object it modifies is completely flat.

```typescript jsx
import { DirectForm, useFormControl } from "./DirectForm";


function AddressForm() {
  const { register } = useFormControl();
  return (
    <>
      <input {...register('zip')} />
      <input {...register('city')} />
      <input {...register('street')} />
    </>
  );
}

function App() {
  const [value, setValue] = useState({
    personAddress: {},
    estateAddress: {}
  });

  return (
    <DirectForm value={value} onSubmit={setValue}>
      {({ registerForm, submit }) => (
        <DirectForm {...registerForm('personAddress')}>
          <AddressForm />
        </DirectForm>
        <DirectForm {...registerForm('estateAddress')}>
          <AddressForm />
        </DirectForm>
        <button onClick={submit}>Submit</button>
      )}
    </DirectForm>
  );
}
```

## API

### DirectForm

#### value

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### onChange

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### onSubmit

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### prefix

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### submitOnChange

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### submitOnBlur

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### validateOnInit

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### validateOnChange

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### validateOnBlur

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### validateOnSubmit

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### validateInvalid

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### schema

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### customRegister

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

### DirectFormContext

#### data

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### validate

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### getError

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### errors

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### getValue

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### getList

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### setValue

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### submit

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### registerForm

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

#### register

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|          |      |         |             |

##### Example

### DirectFormSettings

#### customRegister

| Property       | Type              | Default | Description                                                              |
| -------------- | ----------------- | ------- | ------------------------------------------------------------------------ |
| customRegister | CustomRegisterFnc | -       | Can be used to globally overwrite the behaviour of the `register` method |

##### Example

```typescript jsx
import React, { useState } from 'react';
import { DirectForm, DirectFormSettings } from 'react-directform';
import { object, string } from 'yup';
import { TextField } from '@material-ui/core';

function App() {
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();

  // Custom register method to add the validation errors to material ui TextFields
  function register(ctx: DirectFormContextData<any>, org: DirectFormContextData<any>['register']) {
    return (path: string, value?: 'value' | 'checked') => ({
      ...org(path, value),
      error: !!ctx.getError(path),
      helperText: ctx.getError(path),
    });
  }

  return (
    <DirectFormSettings customRegister={register}>
      <DirectForm value={value1} onSubmit={setValue1}>
        ...
      </DirectForm>
      <DirectForm value={value2} onSubmit={setValue2}>
        ...
      </DirectForm>
    </DirectFormSettings>
  );
}
```

## Hooks

### useDirectForm

The `useDirectForm` hook can be used to access the DirectForm context which contains all information usually provided by the render function.

#### Example

```typescript jsx
...
function PersonForm() {
  const { register, getError } = useDirectForm();
  return (
    <>
      <input {...register('firstname')} />
      {getError('firstname')}
      <input {...register('lastname')} />
      {getError('lastname')}
    </>
  );
}

function App() {
  const [value, setValue] = useState();
  return (
    <DirectForm schema={schema} value={value} onSubmit={setValue}>
      <PersonForm />
    </DirectForm>
  );
}
...
```
