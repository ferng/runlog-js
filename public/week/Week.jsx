import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from '../general/SelectOpts';
import {weekDayFromDate, littleDate} from '../general/dateTime';
import Lap from '../lap/Lap';
import SessionList from '../session/SessionList';
import { prepSelectOpts, postNewItem } from '../lapDataSvcs';
import { createSession, createLap } from '../lapTools';
import { RefDataContext } from '../refData-context';
import LapInfo from '../lap/LapInfo';

class Day extends React.Component {
  updateTotals(totalLap) {
    this.setState({ totalLap });
  }

  handleDateChange(e) {
    const start = this.calcWeekStart(new Date(e.target.value));
    this.setState = {
      weekStart: start,
      idFromTime: start.getTime()/1000,
    }
  }

  constructor(props) {
    super(props);
    const start = this.calcWeekStart(new Date());
    this.state = {
      totalLap: undefined,
      weekStart: start,
      idFromTime: start.getTime()/1000,
    }
    this.updateTotals = this.updateTotals.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  
  calcWeekStart(date) {
    const offset = (date.getUTCDay() === 0 ? 7 : date.getUTCDay()) -1;
    return new Date(date.getFullYear(), date.getUTCMonth(), date.getUTCDate() - offset);
  }

  render() {
    const { activityDate } = this.props;
    const date = new Date(activityDate *1); 
    const weekDay = weekDayFromDate(date);
    const stringDate = littleDate(date);
    const parent = 1;
    const totalLap = this.state.totalLap;
    const { weekStart }= this.state;
    const weekStartStr = weekStart.toISOString().slice(0,10);

    const dateAction = 
      <input type="date" id="weekStart" value={weekStartStr} onChange={this.handleDateChange}/> ;

    return (
      <div className='twelve columns' >

        <div className='four columns'>
            <div className='data'>
              <label id='weekStartLabel' htmlFor='weekStart'>Weeks Start Date: </label>
              {dateAction}
            </div>
        </div>
        <div className='one column'>
            <div className='data' id='weekNum'>
              Week No. 33 
            </div>
        </div>
        <div className='one column'>
             <div className='data' id='weekTotal'>
                55 
             </div>
        </div>
      </div>
    );
  }
}


export default Day;
