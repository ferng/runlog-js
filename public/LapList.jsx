import React from 'react';
import PropTypes from 'prop-types';
import {prepDistanceMultiplier} from './lapDataSvcs.jsx';
import {lapsToReactRows, getValues, createCleanLap} from './lapTools.jsx';


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
        let newLap = createCleanLap();
        let editNewlap = LapList.context.state.lapToEdit === 0;
        newLap['editLap'] = editNewlap;
        return newLap;
    }

    render() {
        if (this.state.laps.size > 0) {
            let laps = getValues(LapList.context.state.laps); // gets an array of all laps in the lap map
            let newLap = this.createNewLap();
            laps.push(newLap);

            let splitData = lapsToReactRows(laps, this.onLapEdit, LapList.context.props.onLapSubmit);
            return (
                <div className='lapList'>
                    {splitData}
                </div>
            );
        } else {
            return null;
        }
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
