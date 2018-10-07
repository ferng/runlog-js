import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from './SelectOpts';
import Lap from './Lap';
import { prepSelectOpts, postNewItem } from './lapDataSvcs';
import { createSession } from './lapTools';


class SessionInfo extends React.Component {
  onEdit() {
    if (this.props.onEdit !== undefined) {
      this.props.onEdit(this.props.id);
    }
  }

  constructor(props) {
    super(props);
    SessionInfo.context = this;
    this.onEdit= this.onEdit.bind(this); 
  }

  render() {
    const { session } = this.props;
    return (
      <div
        className='twelve columns'
        onClick={() => this.onEdit()}
        role='presentation'
      >

        <div className='two columns'>
          <label id='activityLabel' htmlFor='dataActivity'>Activity: </label>
          <div className='data' id='dataActivity'>
            {session.activity}
          </div>
        </div>
        
        <div className='two columns'>
          <label id='kitLabel' htmlFor='dataKit'>Kit: </label>
          <div className='data' id='dataKit'>
            {session.kit}
          </div>
        </div>
        
        <div className='two columns'>
          <label id='weatherLabel' htmlFor='dataWeather'>Weather: </label>
          <div className='data' id='dataWeather'>
            {session.weather}
          </div>
        </div>
        
        <div className='two columns'>
          <label id='feelsLabel' htmlFor='dataFeels'>Feels: </label>
          <div className='data' id='dataFeels'>
            {session.feels}
          </div>
        </div>
        
        <div className='two columns'>
          <label id='effortLabel' htmlFor='dataEffort'>Effort: </label>
          <div className='data' id='dataEffort'>
            {session.effort}
          </div>
        </div>
        
      </div>
      
    );
  }
}


export default SessionInfo;