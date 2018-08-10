import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import SelectOpts from './SelectOpts';
import { prepSelectOpts, postNewItem } from './lapDataSvcs';
import { createSession } from './lapTools';


class SessionForm extends React.Component {
  static toggleModal() {
    SessionForm.context.setState({
      showModal: !SessionForm.context.state.showModal,
    });
  }

  static handleActivityChange(e) {
    SessionForm.context.setState({ activity: e.target.value });
  }
  
  static handleKitChange(e) {
    SessionForm.context.setState({ kit: e.target.value });
  }

  static handleWeatherChange(e) {
    SessionForm.context.setState({ weather: e.target.value });
  }

  static handleFeelsChange(e) {
    SessionForm.context.setState({ feels: e.target.value });
  }

  static handleEffortChange(e) {
    SessionForm.context.setState({ effort: e.target.value });
  }

  static handleSubmit(e) {
    e.preventDefault();
    let id = SessionForm.context.state.id !== 0 ? SessionForm.context.state.id : Date.now();
    let activity = SessionForm.context.state.activity;
    let kit = SessionForm.context.state.kit;
    let weather = SessionForm.context.state.weather;
    let feels = SessionForm.context.state.feels;
    let effort = SessionForm.context.state.effort;
    if (!activity || activity === '--' ||
      !kit || kit === '--' ||
      !weather || weather === '--' ||
      !feels || feels === '--' ||
      !effort || effort === '--') {
        return;
    }

    let newSession = {session: createSession(id, activity, kit, weather, feels, effort)};
    postNewItem(newSession, 'session')
      .catch((err) => {
        SessionForm.context.setState({ errHead: 'Error', errMsg: 'Error saving data, please try later' });
        SessionForm.toggleModal();
      });
//     ActivityForm.context.props.onLapSubmit(newActivity);

//     ActivityForm.context.setState(createActivity());
  }


  constructor(props) {
    super(props);
    this.state = {showModal: false,}
    SessionForm.context = this;
  }

  componentWillMount() {
    SessionForm.context.setState(createSession());
    SessionForm.context.setState({ activityOpts: prepSelectOpts(this.context.refData, 'activity') });
    SessionForm.context.setState({ kitOpts: prepSelectOpts(this.context.refData, 'kit') });
    SessionForm.context.setState({ weatherOpts: prepSelectOpts(this.context.refData, 'weather') });
    SessionForm.context.setState({ feelsOpts: prepSelectOpts(this.context.refData, 'feels') });
    SessionForm.context.setState({ effortOpts: prepSelectOpts(this.context.refData, 'effort') });
  }

  render() {
    return (
      <div>
        <Modal errHead={this.state.errHead} errMsg={this.state.errMsg} show={this.state.showModal} onClose={SessionForm.toggleModal} />
        <div className='twelve six columns left'>
          <form className='sessionForm' onSubmit={SessionForm.handleSubmit}>
            <div className='two columns'>
              <label id='newActivityLabel' htmlFor='newActivity'>Activity: </label>
              <SelectOpts
                id='newActivity'
                value={ this.state.activity }
                defaultValue={ this.state.activity }
                options={ this.state.activityOpts }
                onChange={ SessionForm.handleActivityChange }
              />
            </div>

            <div className='two columns'>
              <label id='newKitLabel' htmlFor='newKit'>Kit: </label>
              <SelectOpts
                id='newKit'
                value={ this.state.kit }
                defaultValue={ this.state.kit }
                options={ this.state.kitOpts }
                onChange={ SessionForm.handleKitChange }
              />
            </div>
            <div className='two columns'>
              <label id='newWeatherLabel' htmlFor='newWeaher'>Weather: </label>
              <SelectOpts
                id='newWeather'
                value={ this.state.weather }
                defaultValue={ this.state.weather }
                options={ this.state.weatherOpts }
                onChange={ SessionForm.handleWeatherChange }
              />
            </div>

            <div className='two columns'>
              <label id='newFeelsLabel' htmlFor='newFeels'>Feels: </label>
              <SelectOpts
                id='newFeels'
                value={ this.state.feels }
                defaultValue={ this.state.feels }
                options={ this.state.feelsOpts }
                onChange={ SessionForm.handleFeelsChange }
              />
            </div>

            <div className='two columns'>
              <label id='newEffortLabel' htmlFor='newEffort'>Effort: </label>
              <SelectOpts
                id='newEffort'
                value={ this.state.effort }
                defaultValue={ this.state.effort }
                options={ this.state.effortOpts }
                onChange={ SessionForm.handleEffortChange }
              />
            </div>

            <div className='one column'>
              <button display="primary" type="submit" >OK</button>
            </div>

          </form>
        </div>
      </div>
    )
  }
}


SessionForm.contextTypes = {
  refData: PropTypes.any.isRequired,
};

export default SessionForm;