import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import ContextProvider from '../provider/ContextProvider';

import { GlobalStyle } from '../utils/styles';
import Navigation from './Navigation';
import { useGraphQL } from '../hooks/use-graphql';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
`;

const Layout = ({ children }) => {
  const { site } = useGraphQL();
  return (
    <ContextProvider>
      <GlobalStyle />
      <>
        <Navigation siteTitle={site.siteMetadata.title} />
        <Wrapper>
          {children}
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </Wrapper>
      </>
    </ContextProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
