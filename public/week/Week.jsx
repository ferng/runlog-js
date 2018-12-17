import React from 'react';
import PropTypes from 'prop-types';
import Day from '../day/Day';
import { calcLapsTotals, updateLaps } from '../lapTools';
import { RefDataContext } from '../refData-context';
import { moveDate, calcWeekStart } from '../general/dateTime';
import LapInfo from '../lap/LapInfo';

class Week extends React.Component {
  constructor(props) {
    super(props);
    const start = calcWeekStart(new Date());
    this.state = {
      totalLap: undefined,
      weekStart: start,
    };
    this.handleUpdateTotals = this.handleUpdateTotals.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.lastWeek = this.lastWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
  }

  handleUpdateTotals(updatedLapTotal) {
    const newLaps = updateLaps(this.state.laps, updatedLapTotal);

    this.setState({ laps: newLaps });
    const totalLap = calcLapsTotals(newLaps, this.props.multipliers);
    this.setState({ totalLap });
  }

  lastWeek() {
    let { weekStart } = this.state;
    weekStart = moveDate(weekStart, -7);
    this.setState({ weekStart, totalLap: undefined, laps: undefined });
  }

  nextWeek() {
    let { weekStart } = this.state;
    weekStart = moveDate(weekStart, 7);
    this.setState({ weekStart, totalLap: undefined, laps: undefined });
  }

  handleDateChange(e) {
    const weekStart = calcWeekStart(new Date(e.target.value));
    this.setState({ weekStart, totalLap: undefined, laps: undefined });
  }

  daysForWeek() {
    const { weekStart } = this.state;
    const weekStartMills = weekStart.getTime();
    const idFromDate = weekStartMills / 1000;
    const days = [];
    for (let i = 0; i < 7; i++) {
      const id = idFromDate + i;
      const thisDate = new Date(weekStartMills);
      thisDate.setDate(thisDate.getDate() + i);
      const day = <Day key={id} parentId={id} activityDate={thisDate} updateTotals={this.handleUpdateTotals} />;
      days.push(day);
    }
    return days;
  }

  render() {
    const { totalLap } = this.state;
    const { weekStart } = this.state;
    const weekStartStr = weekStart.toISOString().slice(0, 10);
    const days = this.daysForWeek();

    return (
      <div>
        <div className='twelve columns bkg-week' >

          <div className='three columns'>
            <div className='data'>
              <label id='weekStartLabel' className='week-heading' htmlFor='weekStart'>WEEK STARTS:
                <input type='date' id='weekStart' value={weekStartStr} onChange={this.handleDateChange} />
                <button display='primary' type='button' onClick={this.lastWeek}>&#x22B2;</button>
                <button display='primary' type='button' onClick={this.nextWeek}>&#x22B3;</button>
              </label>
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

Week.propTypes = {
  multipliers: PropTypes.objectOf(PropTypes.string, PropTypes.number).isRequired,
};

export default Week;
