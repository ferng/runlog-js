import React from 'react';
import PropTypes from 'prop-types';
import LapForm from './LapForm';
import Lap from './Lap';

/**
 * A React component to display or enter lap data.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} lap - Object defining a {@link module:public/types~lap|lap}
 * @property {function} onLapEdit - Callback function to execute when a lap being displayed is clicked for editing
 * @property {function} onLapSubmit - Callback function to execute when a lap being entered or edited is submitted for processing
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class LapField extends React.Component {
  constructor(props) {
    super(props);
    LapField.context = this;
  }

  render() {
    const { lap } = this.props;
    const { editLap } = this.props;

    if (editLap) {
      return (
        <div className='four columns'>
          <LapForm lap={lap} onLapSubmit={LapField.context.props.onLapSubmit} />
        </div>
      );
    } else {
      return (
        <div className='four columns'>
          <Lap lap={lap} onLapEdit={LapField.context.props.onLapEdit} borderOn={true}/>
        </div>
      );
    }
  }
}


LapField.propTypes = {
  editLap: PropTypes.bool,
  lap: PropTypes.shape({
    distance: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,

  }),
};

LapField.defaultProps = {
  editLap: false,
  lap: {
    distance: 0,
    id: -1,
    time: '00:00:00',
    unit: '--',
  },
};

export default LapField;
