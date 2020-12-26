# :clipboard: DirectForm

A simple way to modify complex data with react forms

[![npm](https://img.shields.io/npm/dt/react-directform)](https://www.npmjs.com/package/react-directform)
[![npm](https://img.shields.io/npm/v/react-directform)](https://www.npmjs.com/package/react-directform)
[![NPM](https://img.shields.io/npm/l/react-directform)](https://www.npmjs.com/package/react-directform)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/yhaering/react-directform/Continues%20Integration)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-directform)](<(https://bundlephobia.com/result?p=react-directform)>)
[![Maintainability](https://api.codeclimate.com/v1/badges/d01900bcdd97d166f417/maintainability)](https://codeclimate.com/github/yhaering/react-directform/maintainability)

## Install

```
npm install react-directform
```

## Quickstart

```typescript jsx
import React, { useState } from 'react';
import { DirectForm } from 'react-directform';
import { object } from 'yup';

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
        </form>
      )}
    </DirectForm>
  );
}
```
