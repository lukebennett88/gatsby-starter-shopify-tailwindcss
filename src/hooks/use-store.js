import { useContext } from 'react';

import { StoreContext } from '../context/StoreContext';

export function useStore() {
  const { store } = useContext(StoreContext);
  return store;
}
