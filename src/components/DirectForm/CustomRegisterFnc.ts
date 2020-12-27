import { DirectFormContextData } from './DirectFormContext';

export type CustomRegisterFnc = (
  ctx: DirectFormContextData<any>,
  org: DirectFormContextData<any>['register'],
) => DirectFormContextData<any>['register'];
