import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ProductGrid from '../components/ProductGrid';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Shop powered by Gatsby and Shopify.</p>
    <ProductGrid />
  </Layout>
);

export default IndexPage;
