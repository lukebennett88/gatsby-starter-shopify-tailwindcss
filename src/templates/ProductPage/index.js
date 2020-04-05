import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import ProductForm from '../../components/product-form';

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct;
  return (
    <Layout>
      <SEO title={product.title} description={product.description} />
      <div className="max-w-5xl mx-auto">
        <div className="md:grid md:grid-cols-3">
          <div className="col-span-1">
            {product.images.map((image) => (
              <Img
                fluid={image.localFile.childImageSharp.fluid}
                key={image.id}
                alt={product.title}
              />
            ))}
          </div>
          <div className="col-span-2">
            <h1 className="text-4xl font-bold break-words">{product.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
            <ProductForm product={product} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`;

export default ProductPage;
