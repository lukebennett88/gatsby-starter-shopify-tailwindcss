/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { createContext, useState, useEffect } from 'react';
import Client from 'shopify-buy';

const SHOPIFY_CHECKOUT_STORAGE_KEY = 'shopify_checkout_id';

const client = Client.buildClient({
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  domain: `${process.env.SHOP_NAME}.myshopify.com`,
});

const initialStoreState = {
  client,
  isAdding: false,
  checkout: { lineItems: [] },
};

const StoreContext = createContext({
  store: initialStoreState,
  setStore: () => null,
});

function createNewCheckout(store) {
  return store.client.checkout.create();
}

function fetchCheckout(store, id) {
  return store.client.checkout.fetch(id);
}

function setCheckoutInState(checkout, setStore) {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, checkout.id);
  }

  setStore((prevState) => {
    return { ...prevState, checkout };
  });
}

const StoreContextProvider = ({ children }) => {
  const [store, setStore] = useState(initialStoreState);

  useEffect(() => {
    const initializeCheckout = async () => {
      // Check for an existing cart.
      const isBrowser = typeof window !== 'undefined';
      const existingCheckoutId = isBrowser
        ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
        : null;

      if (existingCheckoutId) {
        try {
          const checkout = await fetchCheckout(store, existingCheckoutId);
          // Make sure this cart hasn’t already been purchased.
          if (!checkout.completedAt) {
            setCheckoutInState(checkout, setStore);
            return;
          }
        } catch (e) {
          localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, null);
        }
      }

      const newCheckout = await createNewCheckout(store);
      setCheckoutInState(newCheckout, setStore);
    };

    initializeCheckout();
  }, [store.client.checkout]);

  return (
    <StoreContext.Provider
      value={{
        store,
        setStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StoreContext, StoreContextProvider };
