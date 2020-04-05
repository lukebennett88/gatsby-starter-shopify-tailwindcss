import React from 'react';

import Layout from '../components/layout';
import Cart from '../components/cart';
import { Container } from '../utils/styles';

const CartPage = () => (
  <Layout>
    <Container>
      <h1>Cart</h1>
      <Cart />
    </Container>
  </Layout>
);

export default CartPage;
