import React from 'react';
import PropTypes from 'prop-types';
import {calcTimes} from './lapTools.jsx';

/**
 * A React component to display lap data.
 * The {@link module:public/types~lapContext|context} should contain:
 *      a Map with {@link module:public/types~multipliers|multipliers}.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} lap - Object defining a {@link module:public/types~lap|lap}
 * @property {function} onLapEdit - Callback function to execute when a lap being displayed is clicked for editing
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
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
                        <label id='lapDistLabel' htmlFor='dataDist'>Distance:</label>
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
