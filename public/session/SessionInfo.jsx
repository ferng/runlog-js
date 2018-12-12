import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from '../general/SelectOpts';
import Lap from '../lap/Lap';
import { prepSelectOpts, postNewItem } from '../lapDataSvcs';
import { createSession } from '../lapTools';


class SessionInfo extends React.Component {
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
    const { session } = this.props;
    const {allowSessDel} = this.props;
    let delButton;
    if (allowSessDel) {
      delButton = <button display='primary' type='button' onClick={this.onDel}>DEL</button>;
    }
    
    return (
      <div
        className='twelve columns'
        onClick={() => this.onEdit()}
        role='presentation'
      >

        <div className='one wide column'>
            <label id='dataTimeLabel' htmlFor='dataTime'>Time: </label>
            <div className='data' id='dataTime'>
              {session.time}
            </div>
          </div>
        <div className='one wide column'>
          <label id='dataActivityLabel' htmlFor='dataActivity'>Activity: </label>
          <div className='data' id='dataActivity'>
            {session.activity}
          </div>
        </div>
        
        <div className='one wide column'>
          <label id='dataKitLabel' htmlFor='dataKit'>Kit: </label>
          <div className='data' id='dataKit'>
            {session.kit}
          </div>
        </div>
        
        <div className='one wide column'>
          <label id='dataWeatherLabel' htmlFor='dataWeather'>Weather: </label>
          <div className='data' id='dataWeather'>
            {session.weather}
          </div>
        </div>
        
        <div className='one wide column'>
          <label id='dataFeelsLabel' htmlFor='dataFeels'>Feels: </label>
          <div className='data' id='dataFeels'>
            {session.feels}
          </div>
        </div>
        
        <div className='one wide column'>
          <label id='dataEffortLabel' htmlFor='dataEffort'>Effort: </label>
          <div className='data' id='dataEffort'>
            {session.effort}
          </div>
        </div>
        
        <div className='one narrow column'>
            {delButton}
          </div>

      </div>
      
    );
  }
}


export default SessionInfo;
