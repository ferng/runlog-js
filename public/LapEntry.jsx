import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from './SelectOpts.jsx';
import {prepSelectOpts} from './lapDataSvcs.jsx';


/**
 * A React component to enter lap data.
 * The {@link module:public/types~lapContext|context} should contain:
 *      a Map with {@link module:public/types~refData|refData}.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {string} time - The lap time
 * @property {number} distance - The lap distance
 * @property {unit} unit - The lap distance unit
 * @property {function} onChange - Callback function to execute when any data in a lap has changed
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class LapEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
        LapEntry.context = this;
    }

    componentWillMount() {
        LapEntry.context.setState({options: prepSelectOpts(this.context.refData, 'unit')});
    }

    handleTimeChange(e) {
        LapEntry.context.setState({time: e.target.value});
    }

    handleDistanceChange(e) {
        LapEntry.context.setState({distance: e.target.value});
    }

    handleUnitChange(e) {
        LapEntry.context.setState({unit: e.target.value});
        LapEntry.context.handleChange(e);
    }

    handleChange(e) {
        const data = {};
        data[e.target.id] = e.target.value;
        LapEntry.context.props.onChange(data);
    }

    render() {
        return (
            <div className='LapEntry'>
                <div className='three columns'>
                    <label id='timeLabel' htmlFor='time'>Time: </label>
                    <input
                        type='time'
                        id='time'
                        placeholder='Time'
                        value={this.state.time}
                        step='1'
                        onChange={this.handleTimeChange}
                        onBlur={this.handleChange}
                    />
                </div>

                <div className='three columns'>
                    <label id='distanceLabel' htmlFor='distance'>Distance: </label>
                    <input
                        type='number'
                        id='distance'
                        placeholder='Distance'
                        value={this.state.distance}
                        onChange={this.handleDistanceChange}
                        onBlur={this.handleChange}
                    />
                </div>

                <div className='three columns'>
                    <label id='unitLabel' htmlFor='unit'>Unit: </label>
                    <SelectOpts
                        id='unit'
                        value={this.state.unit}
                        defaultValue={this.state.unit}
                        options={this.state.options}
                        onChange={this.handleUnitChange}
                    />
                </div>

            </div>
        );
    }

};

LapEntry.contextTypes = {
    refData: PropTypes.any.isRequired,
};


export {
    LapEntry,
};
