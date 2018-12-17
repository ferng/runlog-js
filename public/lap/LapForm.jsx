import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from '../general/SelectOpts';
import TimeEntry from '../general/TimeEntry';
import { prepSelectOpts } from '../lapDataSvcs';


/**
 * A React component to enter and submit lap data.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} lap - An object defining a {@link module:public/types~lap|lap}
 * @property {function} onLapSubmit - Callback function to execute when a lap being entered or edited is submitted
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class LapForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.lap.id,
      parentId: props.lap.parentId,
      distance: props.lap.distance,
      time: props.lap.time,
      unit: props.lap.unit,
      options: prepSelectOpts(props.refData, 'unit'),
    };
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTimeUpdate(time) {
    this.setState({ time });
  }

  handleChange(e) {
    const data = {};
    data[e.target.id] = e.target.value;
    this.setState(data);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { id } = this.state;
    const { time } = this.state;
    const { parentId } = this.state;
    const distance = parseFloat(this.state.distance);
    const { unit } = this.state;
    if (!time || time === '00:00:00' || time === '00:00' ||
      !distance || distance === 0 || Number.isNaN(distance) ||
      !unit || unit === '--') {
      return;
    }
    let newLap;
    if (id === -1) {
      newLap = {
        parentId, time, distance, unit,
      };
    } else {
      newLap = {
        parentId, id, time, distance, unit,
      };
    }
    this.props.onSubmit(newLap);
  }

  render() {
    return (
      <form className='LapForm' onSubmit={this.handleSubmit}>

        <div className='three columns'>
          <label id='timeLabel' htmlFor='time'>Time:
            <TimeEntry
              id='time'
              time={this.state.time}
              onUpdate={this.handleTimeUpdate}
              onBlur={this.handleChange}
            />
          </label>
        </div>

        <div className='three columns'>
          <label id='distanceLabel' htmlFor='distance'>Distance:
            <input
              type='number'
              id='distance'
              placeholder='Distance'
              value={this.state.distance}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className='three columns'>
          <label id='unitLabel' htmlFor='unit'>Unit:
            <SelectOpts
              id='unit'
              value={this.state.unit}
              defaultValue={this.state.unit}
              options={this.state.options}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className='two columns'>
          <label id='lapMphLabel' htmlFor='mph'>mph:
            <div className='data' id='dataMph'>
              --
            </div>
          </label>
        </div>

        <div className='one column'>
          <button display='primary' type='submit' >OK</button>
        </div>
      </form>
    );
  }
}


LapForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  refData: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
    if (propValue[key].optType === undefined || propValue[key].options === undefined) {
      return new Error(`Invalid prop ${propFullName} supplied to ${componentName}`);
    }
    return null;
  }).isRequired,
  lap: PropTypes.shape({
    parentId: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
  }),
};

LapForm.defaultProps = {
  lap: {
    parentId: 0,
    distance: 0,
    id: -1,
    time: '00:00:00',
    unit: '--',
  },
};

export default LapForm;
