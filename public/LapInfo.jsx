import React from 'react';
import PropTypes from 'prop-types';
import { calcTimes } from './lapTools';

/**
 * A React component to display lap data.
 * The {@link module:public/types~lapContext|context} should contain:
 *      a Map with {@link module:public/types~multipliers|multipliers}.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} lap - Object defining a {@link module:public/types~lap|lap}
 * @property {function} onLapEdit - Callback function to execute when a lap being displayed is clicked for editing
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class LapInfo extends React.Component {
  static onLapEdit() {
    console.logi(this);
//       LapInfo.context.props.onLapEdit(id);
  }

  constructor(props) {
    super(props);
    LapInfo.context = this;
  }

  render() {
    const { lap } = this.props;
    const multiplier = lap.unit === '--' ? 0 : this.context.multipliers.get(lap.unit);
    const speed = calcTimes(multiplier, lap.distance, lap.time);
    const { mph } = speed;
    const mins = `mins: ${speed.mins}`;
    const {borderOn} = this.props;
    let borderClass = 'twelve columns';
    if (borderOn) {
      borderClass = 'twelve columns left';
    }

    return (
      <div
        className={borderClass}
        onClick={() => LapInfo.onLapEdit()}
        role='presentation'
      >
        <div className='lap'>
          <div className='three columns'>
            <label id='lapTimeLabel' htmlFor='dataTime'>Time: </label>
            <div className='data' id='dataTime'>
              {lap.time}
            </div>
          </div>
          <div className='three columns'>
            <label id='lapDistLabel' htmlFor='dataDist'>Distance:</label>
            <div className='data' id='dataDist'>
              {lap.distance}
            </div>
          </div>
          <div className='three columns'>
            <label id='lapUnitLabel' htmlFor='dataUnit'>Unit: </label>
            <div className='data' id='dataUnit'>
              {lap.unit}
            </div>
          </div>
          <div className='three columns' title={mins}>
            <label id='lapMphLabel' htmlFor='mph'>mph: </label>
            <div className='data' id='dataMph'>
              {mph}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LapInfo.contextTypes = {
  multipliers: PropTypes.any.isRequired,
};

LapInfo.propTypes = {
  lap: PropTypes.shape({
    distance: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
  }),
};

LapInfo.defaultProps = {
  lap: {
    distance: 0,
    id: -1,
    time: '00:00:00',
    unit: '--',
  },
};

export default LapInfo;
