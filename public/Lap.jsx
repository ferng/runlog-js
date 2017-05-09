import React from 'react';
import PropTypes from 'prop-types';
import {calcTimes} from './lapSvcs.jsx';
import {LapForm} from './LapForm.jsx';


class Lap extends React.Component {
    constructor(props) {
        super(props);
        Lap.context = this;
    }

    onLapEdit(id) {
        Lap.context.props.onLapEdit(id);
    }

    render() {
        let id = this.props.id;
        let time = this.props.time;
        let unit = this.props.unit;
        let distance = Number(this.props.distance);
        let editLap = this.props.editLap;
        let multiplier = unit === '--' ? 0 : this.context.multipliers.get(unit);
        let calcs = calcTimes(multiplier, distance, time);
        let mph = calcs['mph'];
        let mins = 'mins: ' + calcs['mins'];

        if (editLap) {
            return (
                    <LapForm id={id} onLapSubmit={Lap.context.props.onLapSubmit} time={time} distance={distance} unit={unit}/>
            );
        } else {
            return (
                <div className='four columns left' onClick={() => this.onLapEdit(id)}>
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
}

Lap.contextTypes = {
    multipliers: PropTypes.any.isRequired,
};


export {
    Lap,
};
