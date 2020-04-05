import { useContext } from 'react';

import { StoreContext } from '../context/StoreContext';

export function useQuantity() {
  const {
    store: { checkout },
  } = useContext(StoreContext);
  const items = checkout ? checkout.lineItems : [];
  const total = items.reduce((acc, item) => acc + item.quantity, 0);
  return [total !== 0, total];
}
