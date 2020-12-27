import React, { FormEvent, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { DirectFormContext, DirectFormContextData } from './DirectFormContext';

import { ObjectSchema, ValidationError } from 'yup';
import { DirectFormSettingsContext } from '../DirectFormSettings/DirectFormSettingsContext';
import { get } from '../../functions/get';
import { set } from '../../functions/set';
import { CustomRegisterFnc } from './CustomRegisterFnc';

export interface DirectFormProps<T extends object> {
  children: ReactNode | ReactNode[] | ((context: DirectFormContextData<T>) => JSX.Element);
  value: T;
  onChange?: (value: T) => void;
  onSubmit?: (value: T) => void;
  prefix?: string;
  removeUndefined?: boolean;
  submitOnChange?: boolean;
  submitOnBlur?: boolean;
  validateOnInit?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnSubmit?: boolean;
  validateInvalid?: boolean;
  schema?: ObjectSchema<any>;
  customRegister?: CustomRegisterFnc;
}

export function DirectForm<T extends object>({
  customRegister,
  onSubmit,
  submitOnChange,
  submitOnBlur,
  removeUndefined = true,
  validateOnInit,
  validateOnChange,
  validateInvalid = true,
  validateOnBlur,
  validateOnSubmit = true,
  children,
  value,
  onChange,
  prefix,
  schema,
}: DirectFormProps<T>) {
  const settings = useContext(DirectFormSettingsContext);
  const [internalValue, setInternalValue] = useState(value);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const trueInternalValue = useRef<T>(value);

  const validate = useCallback(() => {
    if (!schema) {
      return true;
    }
    try {
      schema.validateSync(trueInternalValue.current, { abortEarly: false });
    } catch (err) {
      setErrors(
        err.inner.reduce((errors: Record<string, string>, error: ValidationError) => {
          errors[error.path || ''] = error.message;
          return errors;
        }, {}),
      );
      return false;
    }
    setErrors({});
    return true;
  }, [schema]);

  useEffect(() => {
    if (validateOnInit) {
      validate();
    }
  }, []);

  useEffect(() => {
    setInternalValue(value);
    trueInternalValue.current = value;
  }, [validate, validateOnInit, value]);

  const getError = useCallback(
    (path: string) => {
      return errors[path];
    },
    [errors],
  );

  /**
   * Submits the value to the parent.
   */
  const submit = useCallback(
    (e?: FormEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!validateOnSubmit || validate()) {
        if (onSubmit) {
          onSubmit(trueInternalValue.current);
        }
      }
    },
    [onSubmit, validate, validateOnSubmit],
  );

  /**
   * Returns the value with the given path
   * inside the "value" property
   */
  const getValue = useCallback(
    (path: string) => {
      return get(internalValue, path);
    },
    [internalValue],
  );

  /**
   * Sets the value with the given path
   * inside the "value" property
   */
  const setValue = useCallback(
    (path: string, newValue: string | number | boolean | T) => {
      const newValues = { ...internalValue };
      if (removeUndefined && newValue === '') {
        set(newValues, path, undefined);
      } else {
        set(newValues, path, newValue);
      }
      onChange && onChange(newValues);
      setInternalValue(newValues);
      trueInternalValue.current = newValues;
      if ((validateInvalid && errors[path]) || validateOnChange) {
        validate();
      }
      if (submitOnChange) {
        submit();
      }
    },
    [errors, internalValue, onChange, submit, submitOnChange, validate, validateInvalid, validateOnChange],
  );

  /**
   * Shortcut to set the onChange and value property.
   */
  const register = useCallback(
    (path: string, valueProp: 'value' | 'checked' = 'value') => {
      const data = {
        onChange: (e) => {
          setValue(path, e.target[valueProp]);
        },
        value: getValue(path) || '',
        name: `${prefix ? `${prefix}.` : ''}${path}`,
      } as ReturnType<DirectFormContextData<T>['register']>;

      if (submitOnBlur || validateOnBlur) {
        data.onBlur = () => {
          if (validateOnBlur) {
            validate();
          }
          if (submitOnBlur) {
            submit();
          }
        };
      }

      return data;
    },
    [getValue, prefix, setValue, submit, submitOnBlur, validate, validateOnBlur],
  );

  /**
   * Shortcut to register a sub form.
   */
  const registerForm = useCallback(
    (path: string, index?: number) => {
      const fullPath = typeof index === 'number' ? `${path}[${index}]` : path;
      return {
        onSubmit: (v) => setValue(fullPath, v),
        value: getValue(fullPath),
        prefix: fullPath,
      } as ReturnType<DirectFormContextData<T>['registerForm']>;
    },
    [getValue, setValue],
  );

  /**
   * Returns an array instead of a value
   */
  const getList = useCallback(
    (path: string) => {
      const value = getValue(path);
      return value || [];
    },
    [getValue],
  );

  function getContextData() {
    const data = {
      errors,
      validate,
      getError,
      data: value,
      getList,
      registerForm,
      register,
      getValue,
      setValue,
      submit,
    };

    if (settings && settings.customRegister) {
      data.register = settings.customRegister(data, register);
    } else if (customRegister) {
      data.register = customRegister(data, register);
    }

    return data;
  }

  const data = getContextData();

  return (
    <DirectFormContext.Provider value={data}>
      {typeof children === 'function' ? children(data) : children}
    </DirectFormContext.Provider>
  );
}
