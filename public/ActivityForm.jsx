import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from './SelectOpts';
import { postNewItem, prepSelectOpts, prepDistanceMultiplier } from './lapDataSvcs';
import { Lap } from './Lap';
import { createLap, createActivity } from './lapTools';

/**
 * A React component to enter activity data.
 * The {@link module:public/types~lapContext|context} should contain:
 *      a Map with {@link module:public/types~refData|refData}.
 * it adds a Map with {@link module:public/types~multipliers|multipliers} to the context.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} activity - An object defining a {@link module:public/types~activity|activity}
 * @property {function} onActivitySubmit - Callback function to execute when an activity being entered or edited is submitted
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = props.lap;
    ActivityForm.context = this;
  }

  getChildContext() {
    return { multipliers: this.state.multipliers };
  }

  componentWillMount() {
    ActivityForm.context.setState({ multipliers: prepDistanceMultiplier(this.context.refData) });
    ActivityForm.context.setState({ activity: 'track' });
    ActivityForm.context.setState({ kit: 'fast' });
    ActivityForm.context.setState({ weather: 'rainy' });
    ActivityForm.context.setState({ feels: 'muggy' });
    ActivityForm.context.setState({ effort: 'easy' });
    ActivityForm.context.setState({ activityOpts: prepSelectOpts(this.context.refData, 'activity') });
    ActivityForm.context.setState({ kitOpts: prepSelectOpts(this.context.refData, 'kit') });
    ActivityForm.context.setState({ weatherOpts: prepSelectOpts(this.context.refData, 'weather') });
    ActivityForm.context.setState({ feelsOpts: prepSelectOpts(this.context.refData, 'feels') });
    ActivityForm.context.setState({ effortOpts: prepSelectOpts(this.context.refData, 'effort') });
  }

  onLapEdit(e) {
    console.log('yeay');
  }

  handleActivityChange(e) {
    ActivityForm.context.setState({ activity: e.target.value });
  }

  handleKitChange(e) {
    ActivityForm.context.setState({ kit: e.target.value });
  }

  handleWeatherChange(e) {
    ActivityForm.context.setState({ weather: e.target.value });
  }

  handleFeelsChange(e) {
    ActivityForm.context.setState({ feels: e.target.value });
  }

  handleEffortChange(e) {
    ActivityForm.context.setState({ effort: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let id = ActivityForm.context.state.id !== 0 ? ActivityForm.context.state.id : Date.now();
    let activity = ActivityForm.context.state.activity;
    let kit = ActivityForm.context.state.kit;
    let weather = ActivityForm.context.state.weather;
    let feels = ActivityForm.context.state.temp;
    let effort = ActivityForm.context.state.effort;
    if (!activity || activity === '--' ||
      !kit || kit === '--' ||
      !weather || weather === '--' ||
      !feels || feels === '--' ||
      !effort || effort === '--') {
        return;
    }

    let newActivity = {activiy: createActivity(id, activity, kit, weather, feels, effort)};
    postNewItem(newActivity, 'activity');
    // ActivityForm.context.props.onActivitySubmit(newActivity);
    // LapForm.context.setState(createCleanLap());
  }

  render() {
    const lap = createLap();
    return (
      <div className='lapList'>
        <div className='twelve columns left'>
          <form className='ActivityForm' onSubmit={ this.handleSubmit }>
            <div className='one column'>
              <label id='newActivityLabel' htmlFor='newActivity'>Activity: </label>
              <SelectOpts
                id='newActivity'
                value={ this.state.activity }
                defaultValue={ this.state.activity }
                options={ this.state.activityOpts }
                onChange={ this.handleActivityChange }
              />
            </div>
            <div className='one column'>
              <label id='newKitLabel' htmlFor='newKit'>Kit: </label>
              <SelectOpts
                id='newKit'
                value={ this.state.kit }
                defaultValue={ this.state.kit }
                options={ this.state.kitOpts }
                onChange={ this.handleKitChange }
              />
            </div>
            <div className='one column'>
              <label id='newWeatherLabel' htmlFor='newWeaher'>Weather: </label>
              <SelectOpts
                id='newWeather'
                value={ this.state.weather }
                defaultValue={ this.state.weather }
                options={ this.state.weatherOpts }
                onChange={ this.handleWeatherChange }
              />
            </div>
            <div className='one column'>
              <label id='newFeelsLabel' htmlFor='newFeels'>Feels: </label>
              <SelectOpts
                id='newFeels'
                value={ this.state.feels }
                defaultValue={ this.state.feels }
                options={ this.state.feelsOpts }
                onChange={ this.handleFeelsChange }
              />
            </div>

            <div className='one column'>
              <label id='newEffortLabel' htmlFor='newEffort'>Effort: </label>
              <SelectOpts
                id='newEffort'
                value={ this.state.effort }
                defaultValue={ this.state.effort }
                options={ this.state.effortOpts }
                onChange={ this.handleEffortChange }
              />
            </div>

            <Lap lap={ lap } onLapEdit={ this.onLapEdit } />

            <div className='one column'>
              <button display="primary" type="submit" >OK</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

ActivityForm.contextTypes = {
  refData: PropTypes.any.isRequired,
};

ActivityForm.childContextTypes = {
  multipliers: PropTypes.any.isRequired,
};

export {
  ActivityForm,
};
