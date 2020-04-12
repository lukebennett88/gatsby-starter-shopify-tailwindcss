import { useContext } from 'react';

import { StoreContext } from '../context/StoreContext';

export function useStoreContext() {
  const context = useContext(StoreContext);
  return context;
}
