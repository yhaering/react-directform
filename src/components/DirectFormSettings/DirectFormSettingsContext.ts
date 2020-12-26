import { createContext } from 'react';
import { DirectFormProps } from '../DirectForm/DirectForm';

export interface DirectFormSettingsContextData {
  customRegister?: DirectFormProps<any>['customRegister'];
}

export const DirectFormSettingsContext = createContext<DirectFormSettingsContextData>(null as any);
