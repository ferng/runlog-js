import React from 'react';
import PropTypes from 'prop-types';
import {splitRows, prepDistanceMultiplier, lapMapToArray} from './lapSvcs.jsx';
import {LapRow} from './LapRow.jsx';


class LapList extends React.Component {
    constructor(props) {
        super(props);
        LapList.context = this;
    }

    componentWillMount() {
        LapList.context.setState({multipliers: prepDistanceMultiplier(this.context.refData)});
        LapList.context.setState({lapToEdit: 0});
    }

    getChildContext() {
        return {multipliers: this.state.multipliers};
    }

    onLapSubmit(lap) {
        LapList.context.props.onLapSubmit(lap);
    }

    onLapEdit(id) {
        let prevLap = LapList.context.props.data.get(LapList.context.state.lapToEdit);
        if (prevLap !== undefined) {
            prevLap['editLap'] = false;
            LapList.context.props.data.set(LapList.context.state.lapToEdit, prevLap);
        }
        let lapToEdit = LapList.context.props.data.get(id);
        if (lapToEdit !== undefined) {
            lapToEdit['editLap'] = true;
            LapList.context.props.data.set(id, lapToEdit);
        }
        LapList.context.setState({lapToEdit: id});
    }


    render() {
        if (this.props.data.size > 0) {
            let laps = lapMapToArray(this.props.data);
            let editNewlap = LapList.context.state.lapToEdit === 0;
            let newLap = {id: 0, time: '00:00:00', distance: 0, unit: '--', editLap: editNewlap, onLapEdit: this.onLapEdit, onLapSubmit: this.onLapSubmit};
            laps.push(newLap);

            let splitData = splitRows(laps, this.onLapEdit, this.onLapSubmit);

            let lapNodes = splitData.map((lapRow, index) => {
                return (
                    <LapRow data={lapRow} key={index} />
                );
            });
            return (
                // this will be the bit with the scroll bar
                <div className='lapList'>
                    {lapNodes}
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
