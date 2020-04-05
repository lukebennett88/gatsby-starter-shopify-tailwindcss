import React, { useContext } from 'react';

import { StoreContext } from '../../context/StoreContext';
import LineItem from './line-item';

const Cart = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext);

  const handleCheckout = () => {
    window.open(checkout.webUrl);
  };

  const lineItems = checkout.lineItems.map((lineItem) => {
    return <LineItem key={lineItem.id.toString()} lineItem={lineItem} />;
  });

  return (
    <div>
      {lineItems}
      <h2>Subtotal</h2>
      <p>$ {checkout.subtotalPrice}</p>
      <br />
      <h2>Taxes</h2>
      <p>$ {checkout.totalTax}</p>
      <br />
      <h2>Total</h2>
      <p>$ {checkout.totalPrice}</p>
      <br />
      <button
        onClick={handleCheckout}
        type="button"
        disabled={checkout.lineItems.length === 0}
      >
        Check out
      </button>
    </div>
  );
};

export default Cart;
