import React from 'react';
import PropTypes from 'prop-types';
import { getItemsByParent } from '../lapDataSvcs';
import { lapsToReactRows, createLap, calcLapsTotals, cloneData } from '../lapTools';

/**
 * A React component to display data for a number of laps.
 * The {@link module:public/types~lapContext|context} should contain:
 *      a Map with {@link module:public/types~refData|refData},
 * it adds a Map with {@link module:public/types~multipliers|multipliers} to the context.
 * @param {props} props -The properties object containing the properties for this React component
 * @property {object.<number, object>} laps - A map of all laps with key=lap.id, value={@link module:public/types~lap|lap}
 * @property {function} handleSubmit - Callback function to execute when a lap being entered or edited is submitted
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class LapList extends React.Component {
  constructor(props) {
    super(props);
    this.context = this;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDel = this.handleDel.bind(this);
  }


  // Logically this should be set in Lap as that's the only place it's used. But then it would be recalculated for each Lap.
  componentDidMount() {
    const { parentId } = this.props;
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

        const totalLap = calcLapsTotals(laps, this.props.multipliers);
        this.props.onUpdateTotals(totalLap);
      });
  }

  handleEdit(id) {
    const { laps } = this.state;
    const updatedLaps = [];
    laps.forEach((prevLap) => {
      const lap = cloneData(prevLap);
      if (lap.id === id) {
        lap.editLap = true;
      } else {
        lap.editLap = false;
      }
      updatedLaps.push(lap);
    });
    this.setState({ laps: updatedLaps });
  }

  handleSubmit(updatedLap) {
    const { laps } = this.state;
    const updatedLaps = [];
    let newLap = true;
    laps.forEach((prevLap) => {
      const lap = cloneData(prevLap);
      if (lap.id === updatedLap.id) {
        lap.distance = updatedLap.distance;
        lap.time = updatedLap.time;
        lap.unit = updatedLap.unit;
        newLap = false;
      }
      lap.editLap = false;
      updatedLaps.push(lap);
    });
    if (newLap) {
      const revisedLap = cloneData(updatedLap);
      updatedLaps.pop();
      revisedLap.editLap = false;
      updatedLaps.push(revisedLap);
      const newEntry = createLap(this.props.parentId);
      updatedLaps.push(newEntry);
      this.setState(laps);
    }

    this.setState({ laps: updatedLaps });
    const totalLap = calcLapsTotals(updatedLaps, this.props.multipliers);
    this.props.onUpdateTotals(totalLap);
  }

  handleDel(id) {
    const { laps } = this.state;
    const newLaps = [];
    laps.forEach((lap) => {
      if (lap.id !== id) {
        newLaps.push(lap);
      }
    });
    this.setState({ laps: newLaps });
    const totalLap = calcLapsTotals(newLaps, this.props.multipliers);
    this.props.onUpdateTotals(totalLap);
  }


  render() {
    if (this.state === null) {
      return null;
    }

    const { laps } = this.state;
    const splitData = lapsToReactRows(laps, this.handleEdit, this.handleSubmit, this.handleDel, this.props.parentId);
    return (
      <div className='lapList'>
        {splitData}
      </div>
    );
  }
}

LapList.propTypes = {
  onUpdateTotals: PropTypes.func.isRequired,
  multipliers: PropTypes.objectOf(PropTypes.string, PropTypes.number).isRequired,
  parentId: PropTypes.number.isRequired,
};

export default LapList;
