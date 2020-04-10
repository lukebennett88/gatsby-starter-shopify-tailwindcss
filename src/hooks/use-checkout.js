import { useContext } from 'react';

import { StoreContext } from '../context/StoreContext';

export function useCheckout() {
  const {
    store: { checkout },
  } = useContext(StoreContext);

  return () => {
    window.open(checkout.webUrl);
  };
}
