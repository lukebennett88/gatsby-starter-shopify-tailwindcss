import { useContext } from 'react';

import { StoreContext } from '../context/StoreContext';

export function useCartTotals() {
  const {
    store: { checkout },
  } = useContext(StoreContext);

  const tax = checkout.totalTaxV2
    ? `$${Number(checkout.totalTaxV2.amount).toFixed(2)}`
    : '-';
  const total = checkout.totalPriceV2
    ? `$${Number(checkout.totalPriceV2.amount).toFixed(2)}`
    : '-';

  return {
    tax,
    total,
  };
}
