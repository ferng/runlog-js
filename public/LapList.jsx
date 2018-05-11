import React from 'react';
import PropTypes from 'prop-types';
import {prepDistanceMultiplier} from './lapDataSvcs.jsx';
import {lapsToReactRows, getValues, createLap} from './lapTools.jsx';

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
    constructor(props) {
        super(props);
        LapList.context = this;
    }

    // Logically this should be set in Lap as that's the only place it's used. But then it would be recalculated for each Lap.
    componentWillMount() {
        LapList.context.setState({multipliers: prepDistanceMultiplier(this.context.refData)});
        LapList.context.setState({lapToEdit: 0});
        LapList.context.setState({laps: this.props.laps});
    }

    getChildContext() {
        return {multipliers: this.state.multipliers};
    }

    onLapEdit(id) {
        let prevEditLap = LapList.context.state.laps.get(LapList.context.state.lapToEdit);
        if (prevEditLap !== undefined) {
            prevEditLap['editLap'] = false;
        }
        let lapToEdit = LapList.context.state.laps.get(id);
        if (lapToEdit !== undefined) {
            lapToEdit['editLap'] = true;
        }
        LapList.context.setState({lapToEdit: id});
    }

    createNewLap() {
        let newLap = createLap();
        let editNewlap = LapList.context.state.lapToEdit === 0;
        newLap['editLap'] = editNewlap;
        return newLap;
    }

  render() {
        let laps = [];
        if (this.state.laps.size > 0) {
            laps = getValues(LapList.context.state.laps); // gets an array of all laps in the lap map
        }
            let newLap = this.createNewLap();
            laps.push(newLap);

            let splitData = lapsToReactRows(laps, this.onLapEdit, LapList.context.props.onLapSubmit);
            return (
                <div className='lapList'>
                    {splitData}
                </div>
            );
    }
};

LapList.contextTypes = {
    refData: PropTypes.any.isRequired,
};

LapList.childContextTypes = {
    multipliers: PropTypes.any.isRequired,
};


export {
    LapList,
};
