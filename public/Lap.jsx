import React from 'react';
import PropTypes from 'prop-types';
import {calcTimes} from './lapTools.jsx';


class Lap extends React.Component {
    constructor(props) {
        super(props);
        Lap.context = this;
    }

    onLapEdit(id) {
        Lap.context.props.onLapEdit(id);
    }

    render() {
        let lap = this.props.lap;
        let multiplier = lap.unit === '--' ? 0 : this.context.multipliers.get(lap.unit);
        let speed = calcTimes(multiplier, lap.distance, lap.time);
        let mph = speed['mph'];
        let mins = 'mins: ' + speed['mins'];

        return (
            <div className='four columns left' onClick={() => this.onLapEdit(lap.id)}>
                <div className='lap'>
                    <div className='three columns'>
                        <label id='lapTimeLabel' htmlFor='dataTime'>Time: </label>
                        <div className='data' id='dataTime'>
                            {lap.time}
                        </div>
                    </div>
                    <div className='three columns'>
                        <label id='lapDistanceLabel' htmlFor='dataDist'>Distance:</label>
                        <div className='data' id='dataDist'>
                            {lap.distance}
                        </div>
                    </div>
                    <div className='three columns'>
                        <label id='lapUnitLabel' htmlFor='dataUnit'>Unit: </label>
                        <div className='data' id='dataUnit'>
                            {lap.unit}
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


export {
    Lap,
};
