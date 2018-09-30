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

  static onLapSubmit() {
    LapList.calcTotals(LapList.context.state.laps);
  }

  static createNewLap() {
    const newLap = createLap();
    const editNewlap = LapList.context.state.lapToEdit === 0;
    newLap.editLap = editNewlap;
    return newLap;
  }

  constructor(props) {
    super(props);
    LapList.context = this;
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
          totalLap = createNewLap();
        } else {
          laps = [];
          totalLap = LapList.calcTotals( laps );
        }
      LapList.context.setState({ lapToEdit: 0, laps, totalLap });
      });
  }

  render() {
    console.log(LapList.context);
    if (LapList.context.state === null) 
    {
      return null;
    }
    let displayLaps =  [];
    if (this.state.laps.size > 0) {
      displayLaps = LapList.context.state.loadedLaps; 
    }
    const newLap = LapList.createNewLap();

    displayLaps.push(newLap);
    const splitData = lapsToReactRows(displayLaps, LapList.onLapEdit, LapList.onLapSubmit);
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
