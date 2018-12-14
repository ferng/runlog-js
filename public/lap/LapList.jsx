import React from 'react';
import PropTypes from 'prop-types';
import { prepDistanceMultiplier,  getItemsByParent } from '../lapDataSvcs';
import { lapToReact, lapsToReactRows, getValues, createLap, calcLapsTotals } from '../lapTools';

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
      if (lap.id === updatedLap.id) {
        lap.distance = updatedLap.distance;
        lap.time = updatedLap.time;
        lap.unit = updatedLap.unit;
        newLap = false;
      }
      lap.editLap = false;
    })
    if (newLap) {
      laps.pop();
      updatedLap.editLap = false;
      laps.push (updatedLap);
      const newEntry = createLap(this.props.parentId);
      laps.push(newEntry);
      this.setState(laps);
    }
    
    let totalLap = calcLapsTotals(laps, this.props.multipliers);
    this.props.updateTotals(totalLap);

  }

  onLapDel(id) {
    let laps = this.state.laps;
    let newLaps =[];
    laps.forEach((lap) => {
      if (lap.id !== id) {
        newLaps.push(lap);
      }
    })
    this.setState({laps: newLaps});
    let totalLap = calcLapsTotals(newLaps, this.props.multipliers);
    this.props.updateTotals(totalLap);
  }

  constructor(props) {
    super(props);
    this.context = this;
    this.onLapSubmit = this.onLapSubmit.bind(this); 
    this.onLapEdit = this.onLapEdit.bind(this); 
    this.onLapDel = this.onLapDel.bind(this); 
  }


  // Logically this should be set in Lap as that's the only place it's used. But then it would be recalculated for each Lap.
  componentDidMount() {
    const parentId = this.props.parentId;
    getItemsByParent('lap', parentId)
      .then((data) => {
        let laps;
        if (data.length > 0) {
          laps = data;
        } else {
          laps = [];
        }
        const newEntry = createLap(this.props.parentId);
        laps.push(newEntry);
        this.setState({ laps });
        
        let totalLap = calcLapsTotals(laps, this.props.multipliers);
        this.props.updateTotals(totalLap)
      });
  }

  render() {
    if (this.state === null) 
    {
      return null;
    }
    
    let laps = this.state.laps; 
    const splitData = lapsToReactRows(laps, this.onLapEdit, this.onLapSubmit, this.onLapDel, this.props.parentId);
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
