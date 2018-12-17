import React from 'react';
import PropTypes from 'prop-types';
import { calcTimes } from '../lapTools';

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
  onEdit() {
    if (this.props.onEdit !== undefined) {
      this.props.onEdit(this.props.id);
    }
  }

  onDel(e) {
    e.stopPropagation();
    this.props.onDel(this.props.id);
  }

  constructor(props) {
    super(props);
    this.onEdit= this.onEdit.bind(this); 
    this.onDel= this.onDel.bind(this); 
  }

  render() {
    const { lap } = this.props;
    const multiplier = lap.unit === '--' ? 0 : this.props.multipliers.get(lap.unit);
    const speed = calcTimes(multiplier, lap.distance, lap.time);
    const { mph } = speed;
    const mins = `mins: ${speed.mins}`;
    const {borderOn} = this.props;
    let borderClass = 'twelve columns';
    if (borderOn) {
      borderClass = 'twelve columns';
    }

    let delbutton;
    if (lap.id !== -1 && this.props.onEdit !== undefined) {
      delbutton = <button display='primary' type='button' onClick={this.onDel}>DEL</button>;
    }

    return (
      <div
        className={borderClass}
        onClick={() => this.onEdit()}
        role='presentation'
      >
        <div className='lap'>
          <div className='three columns'>
            <label id='dataTimeLabel' htmlFor='dataTime'>Time: </label>
            <div className='data' id='dataTime'>
              {lap.time}
            </div>
          </div>
          <div className='three columns'>
            <label id='dataDistLabel' htmlFor='dataDist'>Distance:</label>
            <div className='data' id='dataDist'>
              {lap.distance}
            </div>
          </div>
          <div className='three columns'>
            <label id='dataUnitLabel' htmlFor='dataUnit'>Unit: </label>
            <div className='data' id='dataUnit'>
              {lap.unit}
            </div>
          </div>
          <div className='two columns' title={mins}>
            <label id='dataMphLabel' htmlFor='dataMph'>mph: </label>
            <div className='data' id='dataMph'>
              {mph}
            </div>
          </div>
          <div className='one column'>
            {delbutton}
          </div>
        </div>
      </div>
    );
  }
}

LapInfo.propTypes = {
  lap: PropTypes.shape({
    distance: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
  }),
};

LapInfo.defaultProps = {
  lap: {
    parentId: -1,
    distance: 0,
    id: -1,
    time: '00:00:00',
    unit: '--',
  },
};

export default LapInfo;
