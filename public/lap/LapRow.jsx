import React from 'react';
import PropTypes from 'prop-types';

/**
 * A React component to group a set of data within a Row (well a div really).
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} data - One or more React Components to be displayed within the row.
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
const LapRow = function LapRow(props) {
  return (
    <div className='twelve columns row'>
      {props.data}
    </div>
  );
};

LapRow.propTypes = {
  data: PropTypes.instanceOf(Array),
};

LapRow.defaultProps = {
  data: [],
};

export default LapRow;
