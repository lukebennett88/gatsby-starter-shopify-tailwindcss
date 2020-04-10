import { useContext } from 'react';

import { StoreContext } from '../context/StoreContext';

export function useAddItemToCart() {
  const {
    store: { checkout, client },
    setStore,
  } = useContext(StoreContext);

  async function addItemToCart(variantId, quantity) {
    if (variantId === '' || !quantity) {
      console.error('Both a size and quantity are required.');
      return;
    }

    setStore((prevState) => {
      return { ...prevState, isAdding: true };
    });

    const checkoutId = checkout.id;
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }];

    const newCheckout = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );

    setStore((prevState) => {
      return { ...prevState, checkout: newCheckout, isAdding: false };
    });
  }

  return addItemToCart;
}
