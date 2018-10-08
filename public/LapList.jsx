import React from 'react';
import PropTypes from 'prop-types';
import { prepDistanceMultiplier,  getItemsByParent } from './lapDataSvcs';
import { lapToReact, lapsToReactRows, getValues, createLap, calcLapsTotals } from './lapTools';

/**
 * A React component to display data for a number of laps.
 * The {@link module:public/types~lapContext|context} should contain:
 *      a Map with {@link module:public/types~refData|refData},
 * it adds a Map with {@link module:public/types~multipliers|multipliers} to the context.
 * @param {props} props -The properties object containing the properties for this React component
 * @property {object.<number, object>} laps - A map of all laps with key=lap.id, value={@link module:public/types~lap|lap}
 * @property {function} onLapSubmit - Callback function to execute when a lap being entered or edited is submitted
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class LapList extends React.Component {
  static calcTotals(laps) {
    const totals = calcLapsTotals(laps);
    const totalLap = {time: totals.time, distance: totals.distance, unit: 'mile'};
    return totalLap;
  }  

  static createNewLap(parentId) {
    const newLap = createLap(parentId);
    return newLap;
  }

  onLapSubmit(updatedLap) {
    let laps = this.state.laps;
    let newLaps = [];
    laps.forEach((lap) => {
      console.log(lap);
      if (lap.id !== -1 && lap.id !== updatedLap.id) {
        console.log(lap.id);
        newLaps.push(lap);
      }
    })
    newLaps.push(updatedLap);
        const newLap = LapList.createNewLap(updatedLap.parentId);
    newLaps.push(newLap);
    this.setState({laps: newLaps});
  }

  constructor(props) {
    super(props);
    LapList.context = this;
    this.onLapSubmit = this.onLapSubmit.bind(this); 
  }




  // Logically this should be set in Lap as that's the only place it's used. But then it would be recalculated for each Lap.
  componentDidMount() {
    const parentId = this.props.parentId;

    getItemsByParent('lap', parentId)
      .then((data) => {
        let laps;
        let totalLap;
        if (data.length > 0) {
          laps = data;
          totalLap = LapList.createNewLap(0);
        } else {
          laps = [];
          totalLap = LapList.calcTotals( laps );
        }
        
        const newLap = LapList.createNewLap(parentId);
        laps.push(newLap);
        LapList.context.setState({ lapToEdit: 0, laps, totalLap });
      });
  }

  render() {
    if (LapList.context.state === null) 
    {
      return null;
    }
    
    let laps = LapList.context.state.laps; 
    
    const splitData = lapsToReactRows(laps, LapList.onLapEdit, this.onLapSubmit, this.props.parentId);
    return (
      <div className='lapList'>
        {splitData}
      </div>
    );
  }
}

LapList.propTypes = {
  parentId: PropTypes.number,
};

export default LapList;
