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

  onLapEdit(id) {
    let laps = this.state.laps;
    laps.forEach((lap) => {
      if (lap.id === id) {
        lap.editLap = true;
      } else {
        lap.editLap = false;
      }
    });
    this.setState(laps);
  }
  
  onLapSubmit(updatedLap) {
    let laps = this.state.laps;
      let newLap = true;
    laps.forEach((lap) => {
      if (lap.id === -1) {
        laps.pop(lap);
      }
      if (lap.id === updatedLap.id) {
        lap.distance = updatedLap.distance;
        lap.time = updatedLap.time;
        lap.unit = updatedLap.unit;
        newLap = false;
      }
        lap.editLap = false;
    })
    if (newLap) {
      updatedLap.editLap = false;
      laps.push (updatedLap);
    }
        const newEntry = LapList.createNewLap(this.props.parentId);
        laps.push(newEntry);
    this.setState(laps);
  }

  constructor(props) {
    super(props);
    LapList.context = this;
    this.onLapSubmit = this.onLapSubmit.bind(this); 
    this.onLapEdit = this.onLapEdit.bind(this); 
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
        
        const newEntry = LapList.createNewLap(this.props.parentId);
        laps.push(newEntry);
        LapList.context.setState({ lapToEdit: 0, laps, totalLap });
      });
  }

  render() {
    if (LapList.context.state === null) 
    {
      return null;
    }
    
    let laps = LapList.context.state.laps; 
    const splitData = lapsToReactRows(laps, this.onLapEdit, this.onLapSubmit, this.props.parentId);
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
