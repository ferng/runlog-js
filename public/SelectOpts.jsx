import React from 'react';
import PropTypes from 'prop-types';


/**
 * @class
 * @classdesc A React component which displays a drop down list.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {string} id - An HTML id used for element selection
 * @property {string | number} value - The initial value used for rendering
 * @property {string | number} defaultValue - The value to use if not other value exists
 * @property {string[]} options - The list of options to display
 * @property {function} onChange - Callback function to execute on any update to the element
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
const SelectOpts = (props) => {
  const { id } = props;
  const { options } = props;
  const { onChange } = props;
  const { value } = props;


  if (!(options && options.constructor === Array &&
        onChange && onChange.constructor === Function &&
        value && value.constructor === String)) {
    return null;
  }

  const reactOptions = options.map((option, index) =>
    <option key={index} value={option}>{option}</option>);

  return (
    <select id={id} onChange={e => onChange(e)} value={value}>{reactOptions}</select>
  );
};


SelectOpts.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SelectOpts;
