import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { DirectForm, useDirectForm } from '../src';

function SubForm() {
  const { register } = useDirectForm();
  return (
    <fieldset>
      <legend>Estate</legend>
      <input {...register('price')} />
      <input {...register('address.city')} />
      <input {...register('address.street')} />
      <input {...register('address.zip')} />
    </fieldset>
  );
}

function Sandbox() {
  const [variant, setVariant] = useState({});

  return (
    <form>
      <DirectForm submitOnChange value={variant} onSubmit={setVariant}>
        {({ registerForm }) => (
          <>
            <DirectForm submitOnChange {...registerForm('estate')}>
              <SubForm />
            </DirectForm>
            <DirectForm submitOnChange {...registerForm('estate2')}>
              <SubForm />
            </DirectForm>
          </>
        )}
      </DirectForm>
      <pre>{JSON.stringify(variant, null, 2)}</pre>
    </form>
  );
}

ReactDOM.render(<Sandbox />, document.querySelector('#root'));
