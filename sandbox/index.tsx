import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { DirectForm } from '../src/components/DirectForm/DirectForm';
import { number, object, string } from 'yup';
import { TextField } from '@material-ui/core';
import { useDirectForm } from '../src/hooks/useDirectForm';
import { DirectFormContextData } from '../src/components/DirectForm/DirectFormContext';
import { DirectFormSettings } from '../src/components/DirectFormSettings/DirectFormSettings';

function SubForm() {
  const { register } = useDirectForm();
  return (
    <fieldset>
      <legend>Estate</legend>
      <TextField label={'Price'} {...register('estate.price')} />
      <TextField label={'City'} {...register('estate.address.city')} />
      <TextField label={'Street'} {...register('estate.address.street')} />
      <TextField label={'Zip'} {...register('estate.address.zip')} />
    </fieldset>
  );
}

function Sandbox() {
  const [variant, setVariant] = useState({});

  const schema = object().shape({
    person: object().shape({
      firstname: string().required(),
      lastname: string().required(),
    }),
    estate: object().shape({
      price: number().min(0),
      address: object().shape({
        city: string(),
        street: string(),
        zip: string(),
      }),
    }),
  });

  function register(ctx: DirectFormContextData<any>, org: DirectFormContextData<any>['register']) {
    return (path: string, value?: 'value' | 'checked') => ({
      ...org(path, value),
      error: !!ctx.getError(path),
      helperText: ctx.getError(path),
    });
  }

  return (
    <DirectFormSettings>
      <DirectForm schema={schema} value={variant} onSubmit={setVariant}>
        {({ register, submit, errors }) => (
          <form onSubmit={submit}>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            <fieldset>
              <legend>Person</legend>
              <TextField label={'Firstname'} {...register('person.firstname')} />
              <TextField label={'Lastname'} {...register('person.lastname')} />
            </fieldset>
            <SubForm />
            <input type={'submit'} />
          </form>
        )}
      </DirectForm>
      <pre>{JSON.stringify(variant, null, 2)}</pre>
    </DirectFormSettings>
  );
}

ReactDOM.render(<Sandbox />, document.querySelector('#root'));
