import { ChangeEvent, createContext, FocusEvent } from 'react';

export interface DirectFormContextData<T> {
  data: Readonly<T>;
  validate: (path?: string) => boolean;
  getError: (path: string) => string | undefined;
  errors: Record<string, string>;
  getValue: (path: string) => string | number | T;
  getList: (path: string) => unknown[];
  setValue: (path: string, value: string | number | T) => void;
  submit: () => void;
  registerForm: (
    path: string,
    index?: number,
  ) => {
    onSubmit: (v: T) => void;
    value: T;
    prefix: string;
  };
  register: (
    path: string,
    valueProp?: 'value' | 'checked',
  ) => {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    value: number | string;
    name: string;
  };
}

export const DirectFormContext = createContext<DirectFormContextData<any>>(null as any);
