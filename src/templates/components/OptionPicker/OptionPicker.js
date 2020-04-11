import PropTypes from 'prop-types';
import React from 'react';

export const OptionPicker = ({ name, options, onChange, selected }) => {
  return (
    <div>
      <label>
        <span>{name}</span>
        <select onChange={onChange} value={selected}>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

OptionPicker.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.any,
  selected: PropTypes.any,
};
