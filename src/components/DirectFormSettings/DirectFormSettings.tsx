import React, { ReactNode, useMemo } from 'react';
import { DirectFormSettingsContext, DirectFormSettingsContextData } from './DirectFormSettingsContext';

export interface DirectFormSettingsProps {
  children: ReactNode | ReactNode[];
  customRegister?: DirectFormSettingsContextData['customRegister'];
}

export function DirectFormSettings({ children, customRegister }: DirectFormSettingsProps) {
  const data = useMemo(
    () => ({
      customRegister,
    }),
    [customRegister],
  );

  return <DirectFormSettingsContext.Provider value={data}>{children}</DirectFormSettingsContext.Provider>;
}
