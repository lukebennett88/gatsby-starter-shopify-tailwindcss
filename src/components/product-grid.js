import React, { useContext } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import StoreContext from '../context/StoreContext';
import { useGraphQL } from '../hooks';

const ProductGrid = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext);
  const { allShopifyProduct } = useGraphQL();

  const getPrice = (price) =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price || 0));

  return (
    <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
      {allShopifyProduct.edges ? (
        allShopifyProduct.edges.map(
          ({
            node: {
              id,
              handle,
              title,
              images: [firstImage],
              variants: [firstVariant],
            },
          }) => (
            <div key={id} className="flex flex-col min-h-full">
              <Link to={`/product/${handle}/`}>
                {firstImage && firstImage.localFile && (
                  <Img
                    fluid={firstImage.localFile.childImageSharp.fluid}
                    alt={handle}
                  />
                )}
              </Link>
              <span className="text-lg font-light text-center">{title}</span>
              <span className="mt-4 font-light text-center">
                {getPrice(firstVariant.price)}
              </span>
            </div>
          )
        )
      ) : (
        <p>No Products found!</p>
      )}
    </div>
  );
};

export default ProductGrid;
