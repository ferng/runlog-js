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
        console.log('data', LapList.context.props.data);
        console.log('lap', LapList.context.state.lapToEdit);

        let lapToEdit = LapList.context.props.data.get(LapList.context.state.lapToEdit);
        if (lapToEdit !== undefined) {
            lapToEdit['editLap'] = false;
            LapList.context.props.data.set(LapList.context.state.lapToEdit, lapToEdit);
        }
        lapToEdit = LapList.context.props.data.get(id);
        lapToEdit['editLap'] = true;
        LapList.context.props.data.set(id, lapToEdit);

        LapList.context.setState({lapToEdit: id});

        // console.log(lapToEdit);
        // LapList.context.forceUpdate(() => {
        //     console.log('sa');
        // });
    }

    render() {
        if (this.props.data.size > 0) {
            let laps = lapMapToArray(this.props.data);
            let newLap = {id: '0', time: '00:00:00', distance: 0, unit: '--', editLap: false, onLapEdit: this.onLapEdit, onLapSubmit: this.onLapSubmit};
            laps.push(newLap);

            let splitData = splitRows(laps, this.onLapEdit);

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
