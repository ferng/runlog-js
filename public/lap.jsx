import React from 'react';
import SelectOpts from './selectOptions.jsx';

class Lap extends React.Component {
    render() {
        return (
            <div className='lap'>
                <h2 className="lapHeader">
                    {this.props.unit}
                </h2>
                {this.props.children.toString()}
                {this.props.time}
            </div>
        );
    }
}


class LapList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let lapData = this.props.data;

        let lapNodes = lapData.map(function(lap) {
            return (
                <Lap unit={lap.unit} time={lap.time} key={lap.id}>
                    {lap.distance}
                </Lap>
            );
        });

        return (
            <div className="lapList">
                {lapNodes}
            </div>
        );
    }
};


class LapForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: '00:00:00', distance: 0, unit: '--'};
        LapForm.context = this;
    }

    render() {
        return (
            <form className="LapForm" onSubmit={this.handleSubmit}>
                <input
                    type="time"
                    id="newLapTime"
                    placeholder="Time"
                    value={this.state.time}
                    onChange={this.handleTimeChange}
                    step="1"
                />
                <input
                    type="number"
                    id="newLapDistance"
                    placeholder="Distance"
                    value={this.state.distance}
                    onChange={this.handleDistanceChange}
                />

                <SelectOpts
                    id="newLapUnit"
                    value={this.state.unit}
                    options={this.props.options}
                    onChange={this.handleUnitChange}
                />

                <input type="submit" value="Post" />

            </form>
        );
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
        let unit = LapForm.context.state.unit.trim();
        if (!time || time == '00:00:00' || !distance || distance === 0 || !unit || unit === '--') {
            return;
        }
        LapForm.context.props.onLapSubmit({time: time, distance: distance, unit: unit});
        LapForm.context.setState({time: '00:00:00', distance: 0, unit: '--'});
    }

};


export {
    LapList,
    LapForm,
};
