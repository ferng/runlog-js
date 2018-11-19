import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from './SelectOpts';
import TimeEntry from './TimeEntry';
import { prepSelectOpts } from './lapDataSvcs';
import { createLap } from './lapTools';


/**
 * A React component to enter and submit lap data.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} lap - An object defining a {@link module:public/types~lap|lap}
 * @property {function} onLapSubmit - Callback function to execute when a lap being entered or edited is submitted
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class LapForm extends React.Component {
  handleTimeChange(time) {
    LapForm.context.setState({ time: time});
  }

  handleDistanceChange(e) {
    this.setState({ distance: e.target.value });
  }

  handleUnitChange(e) {
    this.setState({ unit: e.target.value });
    this.handleChange(e);
  }

  handleChange(e) {
    const data = {};
    data[e.target.id] = e.target.value;
    this.setState(data);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { id } = this.state;
    let { time } = this.state;
    let { parentId }= this.state;
    const distance = parseFloat(this.state.distance);
    const { unit } = this.state;
    if (!time || time === '00:00:00' || time === '00:00' || !distance || distance === 0 || Number.isNaN(distance) || !unit || unit === '--') {
      return;
    }
    time = time.length === 5 ? `${time}:00` : time;
    let newLap;
    if (id === -1) {
      newLap = {parentId, time, distance, unit};
    } else {
      newLap = {parentId, id, time, distance, unit};
    }
    this.props.onSubmit(newLap);
  }


  constructor(props) {
    super(props);
    const options = prepSelectOpts(props.refData, 'unit');
    this.state = {
      options,
      id: props.lap.id, distance: props.lap.distance, time: props.lap.time, unit: props.lap.unit, parentId: props.lap.parentId,
    };
    LapForm.context = this;
    this.handleTimeChange = this.handleTimeChange.bind(this); 
    this.handleDistanceChange = this.handleDistanceChange.bind(this); 
    this.handleUnitChange = this.handleUnitChange.bind(this); 
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  render() {
    return (
      <form className='LapForm' onSubmit={this.handleSubmit}>

      <div className='twelve columns'>
      <div className='three columns'>
      <label id='timeLabel' htmlFor='time'>Time: </label>
      <TimeEntry
          id='time'
          time={this.state.time}
          onUpdate={this.handleTimeChange}
          onBlur={this.handleChange}
        />
      </div>

        <div className='three columns'>
          <label id='distanceLabel' htmlFor='distance'>Distance: </label>
          <input
            type='number'
            id='distance'
            placeholder='Distance'
            value={this.state.distance}
            onChange={this.handleDistanceChange}
            onBlur={this.handleChange}
          />
        </div>

        <div className='three columns'>
          <label id='unitLabel' htmlFor='unit'>Unit: </label>
          <SelectOpts
            id='unit'
            value={this.state.unit}
            defaultValue={this.state.unit}
            options={this.state.options}
            onChange={this.handleUnitChange}
          />
        </div>

        <div className='three columns'>
          <button display='primary' type='submit' >OK</button>
      </div>
      </div>
      </form>
    );
  }
}


LapForm.propTypes = {
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
