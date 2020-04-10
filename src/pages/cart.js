/* eslint-disable no-shadow */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

import { Layout, SEO } from '../components';

import {
  useAddItemToCart,
  useCartItems,
  useCartTotals,
  useCheckout,
  useGraphQL,
  useRemoveItemFromCart,
} from '../hooks';
// import {
//   useAddItemToCart,
//   useCartItems,
//   useCartTotals,
//   useCheckout,
//   useRemoveItemFromCart,
// } from '../context/StoreContext';

const CartPage = () => {
  const {
    allShopifyProductVariant: { nodes: variants },
    allShopifyProduct: { nodes: products },
  } = useGraphQL();

  const lineItems = useCartItems();
  const { tax, total } = useCartTotals();
  const removeFromCart = useRemoveItemFromCart();
  const checkout = useCheckout();
  const addItemToCart = useAddItemToCart();

  const betterProductHandles = products.map(({ handle, variants }) => {
    const newVariants = variants.map((variant) => variant.shopifyId);
    return {
      variants: newVariants,
      handle,
    };
  });

  function getHandleForVariant(variantId) {
    const selectedProduct = betterProductHandles.find((product) => {
      return product.variants.includes(variantId);
    });

    return selectedProduct ? selectedProduct.handle : null;
  }

  function getImageFluidForVariant(variantId) {
    const selectedVariant = variants.find((variant) => {
      return variant.shopifyId === variantId;
    });

    if (selectedVariant) {
      return selectedVariant.image.localFile.childImageSharp.fluid;
    }
    return null;
  }

  const LineItem = ({ item }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-48 overflow-hidden rounded-md shadow">
          <Image fluid={getImageFluidForVariant(item.variant.id)} />
        </div>
        <div className="ml-4">
          <Link
            to={`/product/${getHandleForVariant(item.variant.id)}`}
            className="text-lg font-medium leading-6 text-gray-900 underline transition duration-150 ease-in-out hover:text-gray-600"
          >
            {item.title}
          </Link>
          <dl className="mt-2 text-base leading-6 text-gray-500">
            {item.variant.selectedOptions.map(({ name, value }) => (
              <div key={name}>
                <dt className="inline font-medium text-gray-500">{name}: </dt>
                <dd className="inline mt-1 text-gray-900 sm:mt-0 sm:col-span-2">
                  {value}
                </dd>
              </div>
            ))}
            <div key="quantity">
              <dt className="inline font-medium text-gray-500">Quantity: </dt>
              <dd className="inline mt-1 text-gray-900 sm:mt-0 sm:col-span-2">
                {item.quantity}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex items-baseline">
        <button
          onClick={() => removeFromCart(item.id)}
          type="button"
          className="text-gray-800 underline transition duration-150 ease-in-out hover:text-gray-600"
        >
          Delete
        </button>
        <div className="ml-4 text-3xl font-bold text-gray-900">
          ${Number(item.variant.priceV2.amount).toFixed(2)}
        </div>
      </div>
    </div>
  );

  LineItem.propTypes = {
    item: PropTypes.object,
  };

  const emptyCart = (
    <Layout>
      <SEO title="Cart" />
      <div className="relative pt-16 pb-20" />
      <div className="text-center">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Cart
        </h1>
        <p className="max-w-2xl mx-auto mt-3 text-xl leading-7 text-gray-500 sm:mt-4">
          Your shopping cart is empty.
        </p>
        <button
          onClick={() =>
            addItemToCart(
              variants[Math.floor(Math.random() * (variants.length - 1))]
                .shopifyId,
              1
            )
          }
          type="button"
          className="relative inline-flex items-center px-4 py-2 mt-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md shadow-sm sm:mt-4 hover:bg-gray-700 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray active:bg-gray-900"
        >
          <span role="img" aria-label="Dice Emoji">
            🎲
          </span>{' '}
          Random item plz
        </button>
      </div>
    </Layout>
  );

  return lineItems.length < 1 ? (
    emptyCart
  ) : (
    <Layout>
      <SEO title="Cart" />
      <div className="relative pt-16 pb-20">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Cart
        </h1>
        <div className="mt-3 sm:mt-4">
          {lineItems.map((item) => (
            <React.Fragment key={item.id}>
              <LineItem key={item.id} item={item} />
              <hr className="my-4" />
            </React.Fragment>
          ))}
          <div className="flex">
            <div className="w-full max-w-xs px-4 py-6 ml-auto bg-gray-100 rounded-md shadow">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Cart Summary
              </h3>
              <hr className="my-3" />
              <dl className="grid row-gap-3">
                <div className="flex justify-between">
                  <dt>Subtotal:</dt>
                  <dd>{total}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping:</dt>
                  <dd> - </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Tax: </dt>
                  <dd>{tax}</dd>
                </div>
              </dl>

              <hr className="my-3" />
              <dl className="font-medium">
                <div className="flex justify-between">
                  <dt>Estimated Total:</dt>
                  <dd>{total}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <button
                  onClick={checkout}
                  type="button"
                  className="flex items-center justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
