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
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDel = this.handleDel.bind(this);
  }

  handleEdit() {
    if (this.props.onEdit !== undefined) {
      this.props.onEdit();
    }
  }

  handleDel(e) {
    e.stopPropagation();
    this.props.onDel();
  }

  render() {
    const { lap } = this.props;
    const multiplier = lap.unit === '--' ? 0 : this.props.multipliers.get(lap.unit);
    const speed = calcTimes(multiplier, lap.distance, lap.time);
    const { mph } = speed;
    const mins = `mins: ${speed.mins}`;

    let delButton;
    if (lap.id !== -1 && this.props.onEdit !== undefined) {
      delButton = <button display='primary' type='button' onClick={this.handleDel}>DEL</button>;
    }

    return (
      <div
        className='twelve columns'
        onClick={() => this.handleEdit()}
        role='presentation'
      >
        <div className='lap'>
          <div className='three columns'>
            <label id='dataTimeLabel' htmlFor='dataTime'>Time:
              <div className='data' id='dataTime'>
                {lap.time}
              </div>
            </label>
          </div>
          <div className='three columns'>
            <label id='dataDistLabel' htmlFor='dataDist'>Distance:
              <div className='data' id='dataDist'>
                {lap.distance}
              </div>
            </label>
          </div>
          <div className='three columns'>
            <label id='dataUnitLabel' htmlFor='dataUnit'>Unit:
              <div className='data' id='dataUnit'>
                {lap.unit}
              </div>
            </label>
          </div>
          <div className='two columns' title={mins}>
            <label id='dataMphLabel' htmlFor='dataMph'>mph:
              <div className='data' id='dataMph'>
                {mph}
              </div>
            </label>
          </div>
          <div className='one column'>
            {delButton}
          </div>
        </div>
      </div>
    );
  }
}

LapInfo.propTypes = {
  onEdit: PropTypes.func,
  onDel: PropTypes.func,
  multipliers: PropTypes.objectOf(PropTypes.string, PropTypes.number).isRequired,
  lap: PropTypes.shape({
    distance: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
  }),
};

LapInfo.defaultProps = {
  onEdit: undefined,
  onDel: undefined,
  lap: {
    parentId: -1,
    distance: 0,
    id: -1,
    time: '00:00:00',
    unit: '--',
  },
};

export default LapInfo;
