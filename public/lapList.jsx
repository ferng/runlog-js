import React from 'react';
import PropTypes from 'prop-types';
import {calcTimes, splitRows, prepDistanceMultiplier} from './lapSvcs.jsx';


class Lap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let time = this.props.time;
        let unit = this.props.unit;
        let distance = Number(this.props.distance);
        let calcs = calcTimes(this.context.multipliers.get(unit), distance, time);
        let mph = calcs['mph'];
        let mins = 'mins: ' + calcs['mins'];

        return (
            <div className='four columns left'>
                <div className='lap'>
                    <div className='three columns'>
                        <label id='lapTimeLabel' htmlFor='dataTime'>Time: </label>
                        <div className='data' id='dataTime'>
                            {time}
                        </div>
                    </div>
                    <div className='three columns'>
                        <label id='lapDistanceLabel' htmlFor='dataDist'>Distance:</label>
                        <div className='data' id='dataDist'>
                            {distance}
                        </div>
                    </div>
                    <div className='three columns'>
                        <label id='lapUnitLabel' htmlFor='dataUnit'>Unit: </label>
                        <div className='data' id='dataUnit'>
                            {unit}
                        </div>
                    </div>
                    <div className='three columns' title={mins}>
                        <label id='lapMphLabel' htmlFor='mph'>mph: </label>
                        <div className='data' id='dataMph'>
                            {mph}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Lap.contextTypes = {
    multipliers: PropTypes.any.isRequired,
};


class LapRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let lapData = this.props.data;
        let lapNodes = lapData.map((lap) => {
            return (
                <Lap unit={lap.unit} time={lap.time} key={lap.id} distance={lap.distance} />
            );
        });

        return (
            <div className='row'>
                {lapNodes}
            </div>
        );
    }
};


class LapList extends React.Component {
    constructor(props) {
        super(props);
        LapList.context = this;
    }

    componentWillMount() {
        LapList.context.setState({multipliers: prepDistanceMultiplier(this.context.refData)});
    }

    getChildContext() {
        return {multipliers: this.state.multipliers};
    }

    render() {
        if (this.props.data.length > 0) {
            let splitData = splitRows(this.props.data);

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
