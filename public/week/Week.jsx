import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from '../general/SelectOpts';
import {weekDayFromDate, littleDate} from '../general/dateTime';
import Lap from '../lap/Lap';
import Day from '../day/Day';
import SessionList from '../session/SessionList';
import { prepSelectOpts, postNewItem } from '../lapDataSvcs';
import { createSession, createLapi, daysFromIds, calcLapsTotals, updateLaps } from '../lapTools';
import { RefDataContext } from '../refData-context';
import LapInfo from '../lap/LapInfo';

class Week extends React.Component {
  updateTotals(updatedLapTotal) {
    const newLaps = updateLaps(this.state.laps, updatedLapTotal); 

    this.setState({laps: newLaps});
    const totalLap = calcLapsTotals(newLaps, this.props.multipliers);
    this.setState({ totalLap });
  }

  lastWeek() {
    let {weekStart} = this.state;
    weekStart = this.moveDate(weekStart, -7);
    this.setState({weekStart});
  }

  nextWeek() {
    let {weekStart} = this.state;
    weekStart = this.moveDate(weekStart, 7);
    this.setState({weekStart});
  }

  handleDateChange(e) {
    const start = {weekStart: this.calcWeekStart(new Date(e.target.value))};
    this.setState(start);
  }

  calcWeekStart(date) {
    const offset = -((date.getUTCDay() === 0 ? 7 : date.getUTCDay()) -1);
    return this.moveDate(date, offset);
  }

  moveDate(date, offset) {
    return new Date(date.getFullYear(), date.getUTCMonth(), date.getUTCDate() + offset);
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
      let day = <Day key={id} parentId={id} activityDate={thisDate} updateTotals={this.updateTotals}/>;
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
    this.lastWeek = this.lastWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
  }
  
  render() {
    const parent = 1;
    const totalLap = this.state.totalLap;
    const { weekStart }= this.state;
    const weekStartStr = weekStart.toISOString().slice(0,10);
    const days = this.daysForWeek();

    return (
      <div> 
      <div className='twelve columns bkg-week' >

        <div className='three columns'>
            <div className='data'>
              <label id='weekStartLabel' className='week-heading'>WEEK STARTS: </label>
              <input type="date" id="weekStart" value={weekStartStr} onChange={this.handleDateChange}/> 
              <button display='primary' type='button' onClick={this.lastWeek}>&#x22B2;</button>
                <button display='primary' type='button' onClick={this.nextWeek}>&#x22B3;</button>
            </div>
        </div>
         <div className='four columns'>
           <RefDataContext.Consumer>
               {globalRef => (<LapInfo lap={totalLap} borderOn={true} multipliers={globalRef.multipliers} />)}
            </RefDataContext.Consumer>
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
