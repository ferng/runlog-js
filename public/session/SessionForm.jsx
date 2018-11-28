import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from '../general/SelectOpts';
import { prepSelectOpts, postNewItem } from '../lapDataSvcs';
import { createSession } from '../lapTools';


class SessionForm extends React.Component {
  handleActivityChange(e) {
    this.setState({ activity: e.target.value });
  }
  
  handleKitChange(e) {
    this.setState({ kit: e.target.value });
  }

  handleWeatherChange(e) {
    this.setState({ weather: e.target.value });
  }

  handleFeelsChange(e) {
    this.setState({ feels: e.target.value });
  }

  handleEffortChange(e) {
    this.setState({ effort: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let id = this.state.id;
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
      newSession = {parentId, activity, kit, weather, feels, effort};
    } else {
      newSession = {parentId, id, activity, kit, weather, feels, effort};
    }
    this.props.onSubmit(newSession);
  }


  constructor(props) {
    super(props);
    this.state = {
//       session: props.session,
      id: props.session.id,
      parentIf: props.session.parentId,
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
    this.handleActivityChange = this.handleActivityChange.bind(this); 
    this.handleKitChange = this.handleKitChange.bind(this); 
    this.handleWeatherChange = this.handleWeatherChange.bind(this); 
    this.handleFeelsChange = this.handleFeelsChange.bind(this); 
    this.handleEffortChange = this.handleEffortChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
  }
  

  render() {
    const { lap } = this.props;
    return (
      <div className='twelve columns'>
          <form className='sessionForm' onSubmit={this.handleSubmit}>

            <div className='two columns'>
              <label id='newActivityLabel' htmlFor='newActivity'>Activity: </label>
              <SelectOpts
                id='newActivity'
                value={ this.state.activity }
                defaultValue={ this.state.activity }
                options={ this.state.activityOpts }
                onChange={ this.handleActivityChange }
              />
            </div>
            <div className='two columns'>
              <label id='newKitLabel' htmlFor='newKit'>Kit: </label>
              <SelectOpts
                id='newKit'
                value={ this.state.kit }
                defaultValue={ this.state.kit }
                options={ this.state.kitOpts }
                onChange={ this.handleKitChange }
              />
            </div>
            <div className='two columns'>
              <label id='newWeatherLabel' htmlFor='newWeaher'>Weather: </label>
              <SelectOpts
                id='newWeather'
                value={ this.state.weather }
                defaultValue={ this.state.weather }
                options={ this.state.weatherOpts }
                onChange={ this.handleWeatherChange }
              />
            </div>
            <div className='two columns'>
              <label id='newFeelsLabel' htmlFor='newFeels'>Feels: </label>
              <SelectOpts
                id='newFeels'
                value={ this.state.feels }
                defaultValue={ this.state.feels }
                options={ this.state.feelsOpts }
                onChange={ this.handleFeelsChange }
              />
            </div>
            <div className='two columns'>
              <label id='newEffortLabel' htmlFor='newEffort'>Effort: </label>
              <SelectOpts
                id='newEffort'
                value={ this.state.effort }
                defaultValue={ this.state.effort }
                options={ this.state.effortOpts }
                onChange={ this.handleEffortChange }
              />
            </div>

            <div className='one column'>
              <button display="primary" type="submit" >OK</button>
            </div>
          </form>
      </div>
      
    );
  }
}


export default SessionForm;
