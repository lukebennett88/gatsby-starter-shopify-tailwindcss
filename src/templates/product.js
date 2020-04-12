/* eslint-disable no-shadow */
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'gatsby-image';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import { useAddItemToCart } from '../hooks';
import {
  prepareVariantsWithOptions,
  prepareVariantsImages,
} from '../utilities';
import { Layout, SEO, Thumbnail, OptionPicker } from '../components';

export default function ProductPage({ data: { shopifyProduct: product } }) {
  // const colors = product.options.find(
  //   (option) => option.name.toLowerCase() === 'color'
  // ).values;
  const sizes = product.options.find(
    (option) => option.name.toLowerCase() === 'size'
  ).values;

  const variants = useMemo(() => prepareVariantsWithOptions(product.variants), [
    product.variants,
  ]);
  const images = useMemo(() => prepareVariantsImages(variants, 'color'), [
    variants,
  ]);

  if (images.length < 1) {
    throw new Error('Must have at least one product image!');
  }

  const addItemToCart = useAddItemToCart();
  const [variant, setVariant] = useState(variants[0]);
  const [color, setColor] = useState(variant.color);
  const [size, setSize] = useState(variant.size);
  const [addedToCartMessage, setAddedToCartMessage] = useState(null);

  useEffect(() => {
    const newVariant = variants.find((variant) => {
      return variant.size === size && variant.color === color;
    });

    if (variant.shopifyId !== newVariant.shopifyId) {
      setVariant(newVariant);
    }
  }, [size, color, variants, variant.shopifyId]);

  const gallery =
    images.length > 1 ? (
      <div className="grid grid-cols-6 gap-2">
        {images.map((image) => (
          <Thumbnail
            key={image.color}
            src={image.src}
            onClick={() => setColor(image.color)}
          />
        ))}
      </div>
    ) : null;

  function handleAddToCart() {
    addItemToCart(variant.shopifyId, 1);
    setAddedToCartMessage('🛒 Added to your cart!');
  }

  return (
    <Layout>
      <SEO title={product.title} />
      {addedToCartMessage && (
        <div className="mb-4">
          {addedToCartMessage}
          <button
            onClick={() => setAddedToCartMessage(null)}
            type="button"
            className="ml-auto -mr-2"
          >
            <span className="sr-only">Close message</span>
          </button>
        </div>
      )}
      <div className="relative pt-16 pb-20">
        <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <Image
              fluid={variant.image.localFile.childImageSharp.fluid}
              className="overflow-hidden rounded-md shadow"
            />
            {gallery}
          </div>
          <div className="flex flex-col mt-6">
            <h1 className="text-2xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-3xl sm:leading-9">
              {product.title}
            </h1>
            <div
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              className="mt-4 text-base leading-6 text-gray-500 sm:mt-3"
            />
            <div className="grid grid-cols-2">
              {/* <OptionPicker
                key="Color"
                name="Color"
                options={colors}
                selected={color}
                onChange={(event) => setColor(event.target.value)}
              /> */}
              <OptionPicker
                key="Size"
                name="Size"
                options={sizes}
                selected={size}
                onChange={(event) => setSize(event.target.value)}
              />
            </div>
            <button
              onClick={handleAddToCart}
              type="button"
              className="block m-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

ProductPage.propTypes = {
  data: PropTypes.object,
};

export const ProductPageQuery = graphql`
  query productPage($productId: String!) {
    shopifyProduct(id: { eq: $productId }) {
      id
      title
      descriptionHtml
      options {
        name
        values
      }
      variants {
        availableForSale
        id
        price
        shopifyId
        sku
        title
        selectedOptions {
          name
          value
        }
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 446) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
