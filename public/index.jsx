let React = require('react');
let ReactDOM = require('react-dom');

let Lap = React.createClass({
    render: function() {
        return (
            <div className='lap'>
                <h2 className="lapHeader">
                    {this.props.unit}
                </h2>
                {this.props.children.toString()}
                {this.props.time}
            </div>
        );
    },
});

let TopLevel = React.createClass({
    getLaps: function() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/laps?_=1476854515917');
        let msg;
        xhr.onload = function() {
            if (xhr.status === 200) {
                msg = JSON.parse(xhr.responseText);
                this.setState({data: msg});
            }
        }.bind(this);

        xhr.send();
    },
    handleLapSubmit: function(lap) {
        let laps = this.state.data;
        lap.id = Date.now();
        let newLaps = laps.concat([lap]);
        this.setState({data: newLaps});

        let xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/laps');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(lap));
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.getLaps();
    },
    render: function() {
        return (
            <div className="topLevel">
                <h1>-</h1>
                <LapList data={this.state.data} />
                <LapForm onLapSubmit={this.handleLapSubmit} />
            </div>
        );
    },
});

let LapList = React.createClass({
    render: function() {
        let lapNodes = this.props.data.map(function(lap) {
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
    },
});

let LapForm = React.createClass({

    getInitialState: function() {
        return {unit: 'value1', distance: 0, time: '00:00:00'};
    },
    handleUnitChange: function(e) {
        this.setState({unit: e.target.value});
    },
    handleTimeChange: function(e) {
        this.setState({time: e.target.value});
    },
    handleDistanceChange: function(e) {
        this.setState({distance: e.target.value});
    },

    handleSubmit: function(e) {
        e.preventDefault();
        let unit = this.state.unit.trim();
        let distance = this.state.distance;
        let time = this.state.time;
        if (!distance || !unit || !time) {
            return;
        }
        this.props.onLapSubmit({unit: unit, distance: distance, time: time});
        this.setState({unit: 'value1', distance: 0, time: '00:00:00'});
    },


    render: function() {
        return (
            <form className="LapForm" onSubmit={this.handleSubmit}>
                <input
                    type="time"
                    placeholder="Time"
                    value={this.state.time}
                    onChange={this.handleTimeChange}
                    step="1"
                    />
                <input
                    type="number"
                    placeholder="Distance"
                    value={this.state.distance}
                    onChange={this.handleDistanceChange}
                    />
                <select
                    value={this.state.unit}
                    onChange={this.handleUnitChange}>
                    <option value="value1">Value 1</option>
                    <option value="value2">Value 2</option>
                    <option value="value3">Value 3</option>
                </select>

                <input type="submit" value="Post" />

            </form>
        );
    },

});

ReactDOM.render(
    <TopLevel url="/api/laps" pollInterval={2000} />,
    document.getElementById('content')
);
