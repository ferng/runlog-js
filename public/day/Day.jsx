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

  constructor(props) {
    super(props);
    this.state = {
      totalLap: undefined, 
    }
    this.updateTotals = this.updateTotals.bind(this);
  }

  render() {
    const { activityDate } = this.props;
    const date = new Date(activityDate *1); 
    const weekDay = weekDayFromDate(date);
    const stringDate = littleDate(date);
    const parent = 1;
    const totalLap = this.state.totalLap; 

    return (
      <div>
      <div className='twelve columns' >

        <div className='one column'>
            <div className='data' id='weekDay'>
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
           <SessionList parentId={parent} updateTotals={this.updateTotals}/>
         </div>
       </div>
    );
  }
}


export default Day;
