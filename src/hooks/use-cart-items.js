import { useContext } from 'react';

import { StoreContext } from '../context/StoreContext';

export function useCartItems() {
  const {
    store: { checkout },
  } = useContext(StoreContext);

  return checkout.lineItems;
}
