import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from './SelectOpts.jsx';
import {prepSelectOpts} from './lapSvcs.jsx';
import {getLaps, getRefData, postNewLap} from './lapSvcs.jsx';


class LapForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('====', props);
        this.state = {time: '00:00:00', distance: 0, unit: '--'};
        LapForm.context = this;
    }

    componentWillMount() {
        LapForm.context.setState({options: prepSelectOpts(this.context.refData)});
    }

    handleTimeChange(e) {
        LapForm.context.setState({time: e.target.value});
    }

    handleDistanceChange(e) {
        LapForm.context.setState({distance: e.target.value});
    }

    handleUnitChange(e) {
        LapForm.context.setState({unit: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let time = LapForm.context.state.time;
        let distance = LapForm.context.state.distance;
        let unit = LapForm.context.state.unit;
        if (!time || time == '00:00:00' || !distance || distance === 0 || !unit || unit === '--') {
            return;
        }

        postNewLap({id: Date.now(), time: time, distance: distance, unit: unit});
        LapForm.context.props.onLapSubmit({id: Date.now(), time: time, distance: distance, unit: unit});
        LapForm.context.setState({time: '00:00:00', distance: 0, unit: '--'});
    }

    render() {
        return (
            <div className='four columns left'>
                <form className='LapForm' onSubmit={this.handleSubmit}>
                    <div className='three columns'>
                        <label id='newLapTimeLabel' htmlFor='newLapTime'>Time: </label>
                        <input
                            type='time'
                            id='newLapTime'
                            placeholder='Time'
                            value={this.state.time}
                            onChange={this.handleTimeChange}
                            step='1'
                        />
                    </div>

                    <div className='three columns'>
                        <label id='newLapDistanceLabel' htmlFor='newLapDistance'>Distance: </label>
                        <input
                            type='number'
                            id='newLapDistance'
                            placeholder='Distance'
                            value={this.state.distance}
                            onChange={this.handleDistanceChange}
                        />
                    </div>

                    <div className='three columns'>
                        <label id='newLapUnitLabel' htmlFor='newLapUnit'>Unit: </label>
                        <SelectOpts
                            id='newLapUnit'
                            value={this.state.unit}
                            options={this.state.options}
                            onChange={this.handleUnitChange}
                        />
                    </div>

                    <div className='three columns'>
                        <button display="primary" type="submit" >OK</button>
                    </div>
                </form>
            </div>
        );
    }

};

LapForm.contextTypes = {
    refData: PropTypes.any.isRequired,
};


export {
    LapForm,
};
