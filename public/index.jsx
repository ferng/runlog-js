import React from 'react';
import ReactDOM from 'react-dom';
import {LapList, LapForm} from './lap.jsx';

class TopLevel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
        TopLevel.context = this;
    }

    componentDidMount() {
        this.getLaps();
    };

    handleLapSubmit(lap) {
        let laps = TopLevel.context.state.data;
        lap.id = Date.now();
        let newLaps = laps.concat([lap]);
        TopLevel.context.setState({data: newLaps});

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/laps');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(lap));
    }

    getLaps() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/laps?_=1476854515917');
        let msg;
        xhr.onload = function() {
            if (xhr.status === 200) {
                msg = JSON.parse(xhr.responseText);
                TopLevel.context.setState({data: msg});
            }
        };

        xhr.send();
    }

    render() {
        return (
            <div className="topLevel">
                <h1>-</h1>
                <LapList data={this.state.data} />
                <LapForm onLapSubmit={this.handleLapSubmit} />
            </div>
        );
    }
};


ReactDOM.render(
    <TopLevel url="/api/laps" pollInterval={2000} />,
    document.getElementById('content')
);
