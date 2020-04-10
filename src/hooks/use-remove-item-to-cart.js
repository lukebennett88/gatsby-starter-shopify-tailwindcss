import { useContext } from 'react';

import { StoreContext } from '../context/StoreContext';

export function useRemoveItemFromCart() {
  const {
    store: { client, checkout },
    setStore,
  } = useContext(StoreContext);

  async function removeItemFromCart(itemId) {
    const newCheckout = await client.checkout.removeLineItems(checkout.id, [
      itemId,
    ]);

    setStore((prevState) => {
      return { ...prevState, checkout: newCheckout };
    });
  }

  return removeItemFromCart;
}
