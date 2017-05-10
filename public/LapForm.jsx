import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from './SelectOpts.jsx';
import {prepSelectOpts, postNewLap} from './lapDataSvcs.jsx';
import {createLap, createCleanLap} from './lapTools.jsx';


class LapForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.lap;
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
        let id = LapForm.context.state.id !== 0 ? LapForm.context.state.id : Date.now();
        let time = LapForm.context.state.time;
        let distance = parseFloat(LapForm.context.state.distance);
        let unit = LapForm.context.state.unit;
        if (!time || time == '00:00:00' || !distance || distance === 0 || distance === NaN || !unit || unit === '--') {
            return;
        }

        let newLap = createLap(id, time, distance, unit);
        postNewLap(newLap);
        LapForm.context.props.onLapSubmit(newLap);
        LapForm.context.setState(createCleanLap());
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
                            defaultValue={this.state.unit}
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
