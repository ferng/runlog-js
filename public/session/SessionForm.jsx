import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from '../general/SelectOpts';
import TimeEntry from '../general/TimeEntry';
import { prepSelectOpts } from '../lapDataSvcs';


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.session.id,
      parentId: props.session.parentId,
      time: props.session.time,
      activity: props.session.activity,
      activityOpts: prepSelectOpts(props.refData, 'activity'),
      kit: props.session.kit,
      kitOpts: prepSelectOpts(props.refData, 'kit'),
      weather: props.session.weather,
      weatherOpts: prepSelectOpts(props.refData, 'weather'),
      feels: props.session.feels,
      feelsOpts: prepSelectOpts(props.refData, 'feels'),
      effort: props.session.effort,
      effortOpts: prepSelectOpts(props.refData, 'effort'),
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
    const { activity } = this.state;
    const { kit } = this.state;
    const { weather } = this.state;
    const { feels } = this.state;
    const { effort } = this.state;
    const { parentId } = this.state;
    if (!activity || activity === '--' ||
      !kit || kit === '--' ||
      !weather || weather === '--' ||
      !feels || feels === '--' ||
      !effort || effort === '--') {
      return;
    }
    let newSession;
    if (id === -1) {
      newSession = {
        parentId, time, activity, kit, weather, feels, effort,
      };
    } else {
      newSession = {
        parentId, id, time, activity, kit, weather, feels, effort,
      };
    }
    this.props.onSubmit(newSession);
  }


  render() {
    return (
      <form className='sessionForm' onSubmit={this.handleSubmit}>
        <div className='one wide column'>
          <label id='timeLabel' htmlFor='time'>Time:
            <TimeEntry
              id='time'
              time={this.state.time}
              onUpdate={this.handleTimeUpdate}
              onBlur={this.handleChange}
            />
          </label>
        </div>
        <div className='one wide column'>
          <label id='activityLabel' htmlFor='activity'>Activity:
            <SelectOpts
              id='activity'
              value={this.state.activity}
              defaultValue={this.state.activity}
              options={this.state.activityOpts}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className='one wide column'>
          <label id='kitLabel' htmlFor='kit'>Kit:
            <SelectOpts
              id='kit'
              value={this.state.kit}
              defaultValue={this.state.kit}
              options={this.state.kitOpts}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className='one wide column'>
          <label id='weatherLabel' htmlFor='weaher'>Weather:
            <SelectOpts
              id='weather'
              value={this.state.weather}
              defaultValue={this.state.weather}
              options={this.state.weatherOpts}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className='one wide column'>
          <label id='feelsLabel' htmlFor='feels'>Feels:
            <SelectOpts
              id='feels'
              value={this.state.feels}
              defaultValue={this.state.feels}
              options={this.state.feelsOpts}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className='one wide column'>
          <label id='effortLabel' htmlFor='effort'>Effort:
            <SelectOpts
              id='effort'
              value={this.state.effort}
              defaultValue={this.state.effort}
              options={this.state.effortOpts}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className='one narrow column'>
          <button display='primary' type='submit' >OK</button>
        </div>
      </form>
    );
  }
}

SessionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  refData: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
    if (propValue[key].optType === undefined || propValue[key].options === undefined) {
      return new Error(`Invalid prop ${propFullName} supplied to ${componentName}`);
    }
    return null;
  }).isRequired,
  session: PropTypes.shape({
    time: PropTypes.string.isRequired,
    activity: PropTypes.string.isRequired,
    kit: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired,
    feels: PropTypes.string.isRequired,
    effort: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    parentId: PropTypes.number.isRequired,
    editSession: PropTypes.bool,
  }).isRequired,
};


export default SessionForm;
