import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from '../general/SelectOpts';
import {weekDayFromDate, littleDate} from '../general/dateTime';
import Lap from '../lap/Lap';
import Day from '../day/Day';
import SessionList from '../session/SessionList';
import { prepSelectOpts, postNewItem } from '../lapDataSvcs';
import { createSession, createLapi, daysFromIds } from '../lapTools';
import { RefDataContext } from '../refData-context';
import LapInfo from '../lap/LapInfo';

class Week extends React.Component {
  updateTotals(totalLap) {
    this.setState({ totalLap });
  }

  handleDateChange(e) {
    const start = {weekStart: this.calcWeekStart(new Date(e.target.value))};
    this.setState(start);
  }

  calcWeekStart(date) {
    const offset = (date.getUTCDay() === 0 ? 7 : date.getUTCDay()) -1;
    return new Date(date.getFullYear(), date.getUTCMonth(), date.getUTCDate() - offset);
  }


  daysForWeek() {
    const {weekStart} = this.state;
    const weekStartMills = weekStart.getTime();
    let idFromDate = weekStartMills/1000;
    let days = [];
    for (let i=0; i<7; i++) {
      let id = idFromDate +i;
      let thisDate = new Date(weekStartMills);
      thisDate.setDate(thisDate.getDate() + i);
      let day = <Day key={id} parentId={id} activityDate={thisDate}/>;
      days.push(day);
    }
    return days;
  }

    
  constructor(props) {
    super(props);
    const start = this.calcWeekStart(new Date());
    this.state = {
      totalLap: undefined,
      weekStart: start,
    }
    this.updateTotals = this.updateTotals.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  
  render() {
    const parent = 1;
    const totalLap = this.state.totalLap;
    const { weekStart }= this.state;
    const weekStartStr = weekStart.toISOString().slice(0,10);
    const days = this.daysForWeek();

    const dateAction = 
      <input type="date" id="weekStart" value={weekStartStr} onChange={this.handleDateChange}/> ;

    return (
      <div> 
      <div className='twelve columns bkg-week' >

        <div className='two columns'>
            <div className='data'>
              <label id='weekStartLabel' className='week-heading'>WEEK STARTS: </label>
              {dateAction}
            </div>
        </div>
        <div className='one column'>
            <label id='weekNumberLabel' htmlFor='weekNo'>Week No:</label>
            <div className='data' id='weekNo'>
              33 
            </div>
        </div>
        <div className='one column'>
             <div className='data' id='weekTotal'>
                55 
             </div>
        </div>
      </div>
      <div className='twelve columns' >
        {days}
      </div>
    </div> 
    );
  }
}


export default Week;
