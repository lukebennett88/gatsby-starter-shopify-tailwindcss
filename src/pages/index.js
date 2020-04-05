import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ProductGrid from '../components/product-grid';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <ProductGrid />
  </Layout>
);

export default IndexPage;
