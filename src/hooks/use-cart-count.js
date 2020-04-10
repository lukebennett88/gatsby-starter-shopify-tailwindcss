import { useContext } from 'react';

import { StoreContext } from '../context/StoreContext';

export function useCartCount() {
  const {
    store: { checkout },
  } = useContext(StoreContext);

  const count = checkout.lineItems.reduce(
    (runningTotal, item) => item.quantity + runningTotal,
    0
  );

  return count;
}
