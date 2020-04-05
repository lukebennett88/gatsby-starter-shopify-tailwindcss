import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import reduce from 'lodash/reduce';

import StoreContext from '../../context/StoreContext';

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext);
  const items = checkout ? checkout.lineItems : [];
  const total = reduce(items, (acc, item) => acc + item.quantity, 0);
  return [total !== 0, total];
};

const Navigation = ({ siteTitle }) => {
  const [hasItems, quantity] = useQuantity();

  return (
    <div className="font-bold text-white bg-indigo-700">
      <div className="flex items-baseline justify-between max-w-5xl p-6 mx-auto">
        <Link to="/" className="text-2xl">
          {siteTitle}
        </Link>
        <Link to="/cart" className="flex items-center text-2xl">
          Cart 🛍
          {hasItems && (
            <div className="flex items-center justify-center w-6 h-6 ml-2 text-sm text-indigo-700 bg-white rounded-full">
              {quantity}
            </div>
          )}
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
