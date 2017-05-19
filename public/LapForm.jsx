import React from 'react';
import {LapEntry} from './LapEntry.jsx';
import {postNewItem} from './lapDataSvcs.jsx';
import {createLap} from './lapTools.jsx';


/**
 * A React component to enter and submit lap data.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} lap - An object defining a {@link module:public/types~lap|lap}
 * @property {function} onLapSubmit - Callback function to execute when a lap being entered or edited is submitted
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class LapForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.lap;
        LapForm.context = this;
    }

    handleChange(data) {
        LapForm.context.setState(data);
    }

    handleSubmit(e) {
        e.preventDefault();
        let id = LapForm.context.state.id !== 0 ? LapForm.context.state.id : Date.now();
        let time = LapForm.context.state.time;
        let distance = parseFloat(LapForm.context.state.distance);
        let unit = LapForm.context.state.unit;
        if (!time || time == '00:00:00' || !distance || distance === 0 || distance === NaN || !unit || unit === '--') {
            return;
        }

        let newLap = {lap: createLap(id, time, distance, unit)};
        postNewItem(newLap, 'lap');
        LapForm.context.props.onLapSubmit(newLap);
        LapForm.context.setState(createLap());
    }

    render() {
        return (
            <div className='four columns left'>
                <form className='LapForm' onSubmit={this.handleSubmit}>
                    <LapEntry
                        time={this.state.time}
                        distance={this.state.distance}
                        unit={this.state.unit}
                        onChange={this.handleChange}
                        format='three columns'/>

                    <div className='three columns'>
                        <button display="primary" type="submit" >OK</button>
                    </div>
                </form>
            </div>
        );
    }

};

export {
    LapForm,
};
