import { DirectFormContext, DirectFormContextData } from '../components/DirectForm/DirectFormContext';
import { useContext } from 'react';

export function useDirectForm(): DirectFormContextData<any> {
  return useContext(DirectFormContext);
}
