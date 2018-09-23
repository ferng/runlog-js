import React from 'react';
import PropTypes from 'prop-types';
import LapForm from './LapForm';
import LapInfo from './LapInfo';
import { RefDataContext } from './refData-context';

/**
 * A React component to display or enter lap data.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} lap - Object defining a {@link module:public/types~lap|lap}
 * @property {function} onLapEdit - Callback function to execute when a lap being displayed is clicked for editing
 * @property {function} onLapSubmit - Callback function to execute when a lap being entered or edited is submitted for processing
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class Lap extends React.Component {
  constructor(props) {
    super(props);
    Lap.context = this;
  }

  render() {
    const { lap } = this.props;
    const { editLap } = this.props; 
    const { onLapSubmit } = this.props;
    const { onLapEdit } = this.props;

    if (editLap) {
      return (
        <div className='four columns'>
          <RefDataContext.Consumer>
            {globalRef => (<LapForm lap={lap} refData={globalRef.refData} onLapSubmit={onLapSubmit}/>)}
          </RefDataContext.Consumer>
        </div>
      );
    } else {
      return (
        <div className='four columns'>
          <RefDataContext.Consumer>
            {globalRef => (<LapInfo lap={lap} borderOn={true} multipliers={globalRef.multipliers} onLapEdit={onLapEdit}/>)}
          </RefDataContext.Consumer>
        </div>
      );
    }
  }
}


Lap.propTypes = {
  editLap: PropTypes.bool,
  lap: PropTypes.shape({
    distance: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,

  }),
};

Lap.defaultProps = {
  editLap: false,
  lap: {
    distance: 0,
    id: -1,
    time: '00:00:00',
    unit: '--',
  },
};

export default Lap;
