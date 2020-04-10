import React from 'react';
import PropTypes from 'prop-types';

import { useGraphQL } from '../hooks';
import { Header } from './header';
import { Hero } from './hero';

const Layout = ({ children, hasHero }) => {
  const {
    site: {
      siteMetadata: { title, description },
    },
  } = useGraphQL();

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-700 bg-gray-50">
      <Header />
      {hasHero ? <Hero title={title} description={description} /> : null}
      <main className="flex-1 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-white">
        <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-base leading-6 text-center text-gray-400">
              &copy; {new Date().getFullYear()}{' '}
              <a
                href="https://github.com/lukebennett88/gatsby-starter-shopify-tailwindcss"
                className="font-medium text-gray-600 underline transition duration-150 ease-in-out hover:text-gray-500 active:text-gray-800"
              >
                {title}
              </a>
              . Built with{' '}
              <a
                href="https://www.gatsbyjs.org"
                className="font-medium text-gray-600 underline transition duration-150 ease-in-out hover:text-gray-500 active:text-gray-800"
              >
                Gatsby
              </a>
              ,{' '}
              <a
                href="https://tailwindcss.com"
                className="font-medium text-gray-600 underline transition duration-150 ease-in-out hover:text-gray-500 active:text-gray-800"
              >
                Tailwind
              </a>{' '}
              and{' '}
              <a
                href="https://www.shopify.ca"
                className="font-medium text-gray-600 underline transition duration-150 ease-in-out hover:text-gray-500 active:text-gray-800"
              >
                Shopify
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hasHero: PropTypes.bool,
};

export { Layout };
