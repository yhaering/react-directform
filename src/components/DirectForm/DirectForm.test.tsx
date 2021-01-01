import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { DirectForm, DirectFormProps } from './DirectForm';
import { DirectFormContextData } from './DirectFormContext';
import userEvent from '@testing-library/user-event';

function setup(
  value: DirectFormProps<any>['value'] = { name: 'Max' },
  children?: (ctx: DirectFormContextData<any>) => JSX.Element,
  props?: Partial<DirectFormProps<any>>,
) {
  return render(
    <DirectForm {...props} value={value}>
      {(context) => (
        <>
          {children && children(context)}
          <button onClick={context.submit}>Submit</button>
        </>
      )}
    </DirectForm>,
  );
}

describe('DirectForm', () => {
  it('should register input element correctly', () => {
    setup(undefined, ({ register }) => <input {...register('name')} />);
    expect(screen.getByRole('textbox')).toHaveValue('Max');
  });

  it('should update the internal state of the input', () => {
    setup(undefined, ({ register }) => <input {...register('name')} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Max');
    userEvent.type(input, ' Mustermann');
    expect(input).toHaveValue('Max Mustermann');
  });

  it('should call onUpdate every time a value changes', () => {
    const handleChange = jest.fn();
    setup(undefined, ({ register }) => <input {...register('name')} />, { onChange: handleChange });
    userEvent.type(screen.getByRole('textbox'), '123');
    expect(handleChange).toHaveBeenCalledWith({ name: 'Max1' });
    expect(handleChange).toHaveBeenCalledWith({ name: 'Max12' });
    expect(handleChange).toHaveBeenCalledWith({ name: 'Max123' });
  });

  it('should call the onSubmit function when the form gets submitted', () => {
    const handleSubmit = jest.fn();
    setup(undefined, ({ register }) => <input {...register('name')} />, { onSubmit: handleSubmit });
    userEvent.type(screen.getByRole('textbox'), ' Mustermann');
    userEvent.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalledWith({ name: 'Max Mustermann' });
  });

  it('should call the onSubmit function everytime a value changes if submitOnChange is set', () => {
    const handleSubmit = jest.fn();
    setup(undefined, ({ register }) => <input {...register('name')} />, {
      submitOnChange: true,
      onSubmit: handleSubmit,
    });
    userEvent.type(screen.getByRole('textbox'), '123');
    expect(handleSubmit).toHaveBeenCalledWith({ name: 'Max1' });
    expect(handleSubmit).toHaveBeenCalledWith({ name: 'Max12' });
    expect(handleSubmit).toHaveBeenCalledWith({ name: 'Max123' });
  });

  it('should call the onSubmit function everytime an input gets out of focus if submitOnBlur is set', () => {
    const handleSubmit = jest.fn();
    setup(undefined, ({ register }) => <input {...register('name')} />, {
      submitOnBlur: true,
      onSubmit: handleSubmit,
    });
    userEvent.type(screen.getByRole('textbox'), '123');
    screen.getByRole('textbox').blur();
    expect(handleSubmit).toHaveBeenCalledWith({ name: 'Max123' });
  });
});
