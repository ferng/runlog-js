import React from 'react';
import PropTypes from 'prop-types';
import { weekDayFromDate, littleDate } from '../general/dateTime';
import { cloneData } from '../lapTools';
import SessionList from '../session/SessionList';
import { RefDataContext } from '../refData-context';
import LapInfo from '../lap/LapInfo';

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalLap: undefined,
      parentId: Number.parseInt(props.parentId, 10),
    };
    this.handleUpdateTotals = this.handleUpdateTotals.bind(this);
  }

  handleUpdateTotals(totalLap) {
    const newTotal = cloneData(totalLap);
    newTotal.id = this.props.parentId;
    this.setState({ totalLap: newTotal });
    this.props.updateTotals(newTotal);
  }


  render() {
    const { activityDate } = this.props;
    const date = new Date(activityDate);
    const weekDay = weekDayFromDate(date);
    const stringDate = littleDate(date);
    const { parentId } = this.state;
    const { totalLap } = this.state;

    return (
      <div>
        <div className='twelve columns bkg-day' >

          <div className='one column'>
            <div className='week-heading' id='weekDay'>
              {weekDay}
            </div>
          </div>
          <div className='one column'>
            <div className='data' id='date'>
              {stringDate}
            </div>
          </div>
          <div className='four columns'>
            <RefDataContext.Consumer>
              {globalRef => (<LapInfo lap={totalLap} borderOn={true} multipliers={globalRef.multipliers} />)}
            </RefDataContext.Consumer>
          </div>

        </div>
        <div className='twelve columns'>
          <RefDataContext.Consumer>
            {globalRef => (<SessionList parentId={parentId} updateTotals={this.handleUpdateTotals} multipliers={globalRef.multipliers} />)}
          </RefDataContext.Consumer>
        </div>
      </div>
    );
  }
}

Day.propTypes = {
  parentId: PropTypes.number.isRequired,
  updateTotals: PropTypes.func.isRequired,
  activityDate: PropTypes.instanceOf(Date).isRequired,
};

export default Day;
