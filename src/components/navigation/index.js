import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { useQuantity } from '../../hooks';

const Navigation = ({ siteTitle }) => {
  const [hasItems, quantity] = useQuantity();

  return (
    <div className="sticky top-0 z-10 font-bold text-white bg-indigo-700">
      <div className="flex items-baseline justify-between max-w-5xl p-6 mx-auto">
        <Link to="/" className="text-2xl">
          {siteTitle}
        </Link>
        <Link to="/cart" className="relative flex items-center text-2xl">
          {hasItems && (
            <div className="absolute left-0 transform -translate-x-full">
              <div className="flex items-center justify-center w-6 h-6 mr-3 text-sm leading-none text-indigo-700 bg-white rounded-full">
                {quantity}
              </div>
            </div>
          )}
          Cart 🛍
        </Link>
      </div>
    </div>
  );
};

Navigation.propTypes = {
  siteTitle: PropTypes.string,
};

Navigation.defaultProps = {
  siteTitle: ``,
};

export default Navigation;
