import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from '../general/SelectOpts';
import TimeEntry from '../general/TimeEntry';
import { prepSelectOpts, postNewItem } from '../lapDataSvcs';
import { createSession } from '../lapTools';


class SessionForm extends React.Component {
  handleTimeUpdate(time) {
    this.setState({ time: time});
  }

  handleChange(e) {
    const data = {};
    data[e.target.id] = e.target.value;
    this.setState(data);
  }

  handleSubmit(e) {
    e.preventDefault();
    let id = this.state.id;
    let time = this.state.time;
    let activity = this.state.activity;
    let kit = this.state.kit;
    let weather = this.state.weather;
    let feels = this.state.feels;
    let effort = this.state.effort;
    let parentId = this.state.parentId;
    if (!activity || activity === '--' ||
      !kit || kit === '--' ||
      !weather || weather === '--' ||
      !feels || feels === '--' ||
        !effort || effort === '--') {
        return;
    }
    let newSession;
    if (id === -1) {
      newSession = {parentId, time, activity, kit, weather, feels, effort};
    } else {
      newSession = {parentId, id, time, activity, kit, weather, feels, effort};
    }
    this.props.onSubmit(newSession);
  }


  constructor(props) {
    super(props);
    this.state = {
      id: props.session.id,
      parentIf: props.session.parentId,
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
      }
    SessionForm.context = this;
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }
  

  render() {
    const { lap } = this.props;
    return (
      <div className='twelve columns'>
          <form className='sessionForm' onSubmit={this.handleSubmit}>

            <div className='one wide column'>
              <label id='timeLabel' htmlFor='time'>Time: </label>
              <TimeEntry
                  id='time'
                  time={this.state.time}
                  onUpdate={this.handleTimeUpdate}
                  onBlur={this.handleChange}
                />
            </div>
            <div className='one wide column'>
              <label id='activityLabel' htmlFor='activity'>Activity: </label>
              <SelectOpts
                id='activity'
                value={ this.state.activity }
                defaultValue={ this.state.activity }
                options={ this.state.activityOpts }
                onChange={ this.handleChange }
              />
            </div>
            <div className='one wide column'>
              <label id='kitLabel' htmlFor='kit'>Kit: </label>
              <SelectOpts
                id='kit'
                value={ this.state.kit }
                defaultValue={ this.state.kit }
                options={ this.state.kitOpts }
                onChange={ this.handleChange }
              />
            </div>
            <div className='one wide column'>
              <label id='weatherLabel' htmlFor='weaher'>Weather: </label>
              <SelectOpts
                id='weather'
                value={ this.state.weather }
                defaultValue={ this.state.weather }
                options={ this.state.weatherOpts }
                onChange={ this.handleChange }
              />
            </div>
            <div className='one wide column'>
              <label id='feelsLabel' htmlFor='feels'>Feels: </label>
              <SelectOpts
                id='feels'
                value={ this.state.feels }
                defaultValue={ this.state.feels }
                options={ this.state.feelsOpts }
                onChange={ this.handleChange }
              />
            </div>
            <div className='one wide column'>
              <label id='effortLabel' htmlFor='effort'>Effort: </label>
              <SelectOpts
                id='effort'
                value={ this.state.effort }
                defaultValue={ this.state.effort }
                options={ this.state.effortOpts }
                onChange={ this.handleChange }
              />
            </div>

            <div className='one narrow column'>
              <button display="primary" type="submit" >OK</button>
            </div>
          </form>
      </div>
      
    );
  }
}


export default SessionForm;
