import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './navigation';
import { useGraphQL } from '../hooks/use-graphql';

const Layout = ({ children }) => {
  const { site } = useGraphQL();
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation siteTitle={site.siteMetadata.title} />
      <main className="flex-1 w-full max-w-5xl p-6 mx-auto">{children}</main>
      <footer className="w-full max-w-5xl p-6 mx-auto">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
