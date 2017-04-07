import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from './selectOptions.jsx';
import {prepSelectOpts} from './lapSvcs.jsx';


class LapForm extends React.Component {
    constructor(props) {
        super(props);
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
        LapForm.context.props.onLapSubmit({time: time, distance: distance, unit: unit});
        LapForm.context.setState({time: '00:00:00', distance: 0, unit: '--'});
    }

    render() {
        return (
            <div className='row'>
                <div className='four columns'>
                    <form className='LapForm' onSubmit={this.handleSubmit}>
                        <div className='four columns'>
                            <label id='newLapTimeLabel' htmlFor='newLapTime'>Timemph: </label>
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

                        <div className='two columns'>
                            <button display="primary" type="submit" />

                        </div>
                    </form>
                </div>
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
