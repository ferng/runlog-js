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
      parentId: Number.parseInt(props.parentId, 10), 
    }
    this.updateTotals = this.updateTotals.bind(this);
  }

  render() {
    const { activityDate } = this.props;
    const date = new Date(activityDate *1); 
    const weekDay = weekDayFromDate(date);
    const stringDate = littleDate(date);
    const {parentId} = this.state;
    const totalLap = this.state.totalLap; 

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
             {globalRef => (<SessionList parentId={parentId} updateTotals={this.updateTotals} multipliers={globalRef.multipliers}/>)}
           </RefDataContext.Consumer>
         </div>
       </div>
    );
  }
}


export default Day;
