import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from './SelectOpts.jsx';
import {Lap} from './Lap.jsx';
import {prepSelectOpts, prepDistanceMultiplier} from './lapDataSvcs.jsx';
import {createCleanLap} from './lapTools.jsx';

/**
 * A React component to enter activity data.
 * The {@link module:public/types~lapContext|context} should contain:
 *      a Map with {@link module:public/types~refData|refData}.
 * it adds a Map with {@link module:public/types~multipliers|multipliers} to the context.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} lap - An object defining a {@link module:public/types~lap|lap}
 * @property {function} onActivitySubmit - Callback function to execute when an actrivity being entered or edited is submitted
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class ActivityForm extends React.Component {
    constructor(props) {
        super(props);
        // this.state = props.lap;
        ActivityForm.context = this;
    }

    componentWillMount() {
        ActivityForm.context.setState({multipliers: prepDistanceMultiplier(this.context.refData)});
        ActivityForm.context.setState({activity: 'track'});
        ActivityForm.context.setState({kit: 'fast'});
        ActivityForm.context.setState({weather: 'rainy'});
        ActivityForm.context.setState({temp: 'muggy'});
        ActivityForm.context.setState({effort: 'easy'});
        ActivityForm.context.setState({activityOpts: prepSelectOpts(this.context.refData, 'activity')});
        ActivityForm.context.setState({kitOpts: prepSelectOpts(this.context.refData, 'kit')});
        ActivityForm.context.setState({weatherOpts: prepSelectOpts(this.context.refData, 'weather')});
        ActivityForm.context.setState({tempOpts: prepSelectOpts(this.context.refData, 'temp')});
        ActivityForm.context.setState({effortOpts: prepSelectOpts(this.context.refData, 'effort')});
    }

    getChildContext() {
        return {multipliers: this.state.multipliers};
    }

    handleActivityChange(e) {
        ActivityForm.context.setState({activity: e.target.value});
    }

    handleKitChange(e) {
        ActivityForm.context.setState({kit: e.target.value});
    }

    handleWeatherChange(e) {
        ActivityForm.context.setState({weather: e.target.value});
    }

    handleTempChange(e) {
        ActivityForm.context.setState({temp: e.target.value});
    }

    handleEffortChange(e) {
        ActivityForm.context.setState({effort: e.target.value});
    }

    onLapEdit(e) {
        console.log('yeay');
    }

    handleSubmit(e) {
        e.preventDefault();
        // let id = LapForm.context.state.id !== 0 ? LapForm.context.state.id : Date.now();
        // let time = LapForm.context.state.time;
        // let distance = parseFloat(LapForm.context.state.distance);
        // let unit = LapForm.context.state.unit;
        // if (!time || time == '00:00:00' || !distance || distance === 0 || distance === NaN || !unit || unit === '--') {
        //     return;
        // }

        // let newLap = createLap(id, time, distance, unit);
        // postNewLap(newLap);
        // LapForm.context.props.onLapSubmit(newLap);
        // LapForm.context.setState(createCleanLap());
    }

    render() {
        const lap = createCleanLap();
        return (
            <div className='lapList'>
            <div className='twelve columns left'>
                <form className='ActivityForm' onSubmit={this.handleSubmit}>
                    <div className='one column'>
                        <label id='newActivityLabel' htmlFor='newActivity'>Activity: </label>
                        <SelectOpts
                            id='newActivity'
                            value={this.state.activity}
                            defaultValue={this.state.activity}
                            options={this.state.activityOpts}
                            onChange={this.handleActivityChange}
                        />
                    </div>
                    <div className='one column'>
                        <label id='newKitLabel' htmlFor='newKit'>Kit: </label>
                        <SelectOpts
                            id='newKit'
                            value={this.state.kit}
                            defaultValue={this.state.kit}
                            options={this.state.kitOpts}
                            onChange={this.handleKitChange}
                        />
                    </div>
                    <div className='one column'>
                        <label id='newWeatherLabel' htmlFor='newWeaher'>Weather: </label>
                        <SelectOpts
                            id='newWeather'
                            value={this.state.weather}
                            defaultValue={this.state.weather}
                            options={this.state.weatherOpts}
                            onChange={this.handleWeatherChange}
                        />
                    </div>
                     <div className='one column'>
                        <label id='newTempLabel' htmlFor='newTemp'>Temp: </label>
                        <SelectOpts
                            id='newTemp'
                            value={this.state.temp}
                            defaultValue={this.state.temp}
                            options={this.state.tempOpts}
                            onChange={this.handleTempChange}
                        />
                    </div>

                     <div className='one column'>
                        <label id='newEffortLabel' htmlFor='newEffort'>Effort: </label>
                        <SelectOpts
                            id='newEffort'
                            value={this.state.effort}
                            defaultValue={this.state.effort}
                            options={this.state.effortOpts}
                            onChange={this.handleEffortChange}
                        />
                    </div>

                <Lap lap={lap} onLapEdit={this.onLapEdit} />


                    <div className='one column'>
                        <button display="primary" type="submit" >OK</button>
                    </div>
                </form>
            </div>
            </div>
        );
    }

};

ActivityForm.contextTypes = {
    refData: PropTypes.any.isRequired,
};

ActivityForm.childContextTypes = {
    multipliers: PropTypes.any.isRequired,
};

export {
    ActivityForm,
};
