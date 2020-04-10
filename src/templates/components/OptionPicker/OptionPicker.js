/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';
import { Select, Label } from '@theme-ui/components';

export const OptionPicker = ({ name, options, onChange, selected }) => {
  return (
    <div>
      <Label>{name}</Label>
      <Select onChange={onChange} value={selected}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
};

OptionPicker.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.any,
  selected: PropTypes.any,
};
