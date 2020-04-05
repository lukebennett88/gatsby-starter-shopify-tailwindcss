/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import PropTypes from 'prop-types';
import React from 'react';
import ContextProvider from './src/provider/ContextProvider';

export const wrapRootElement = ({ element }) => (
  <ContextProvider>{element}</ContextProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
};
