import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {LapList} from './lapList.jsx';
import {getLaps, getRefData} from './lapDataSvcs.jsx';
import {lapArrayToMap} from './lapTools.jsx';


class TopLevel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {laps: [], refData: {}};
        TopLevel.context = this;
    }

    componentDidMount() {
        getRefData()
            .then((data) => {
                TopLevel.context.setState({refData: data});
            })
            .then(getLaps)
            .then(lapArrayToMap)
            .then((data) => {
                TopLevel.context.setState({laps: data});
                TopLevel.context.setState({dataLoaded: true});
            })
            ;
    };

    getChildContext() {
        return {refData: TopLevel.context.state.refData};
    }

    handleLapSubmit(lap) {
        let laps = TopLevel.context.state.laps;
        laps.set(lap.id, lap);

        TopLevel.context.setState({laps: laps});
    }

    render() {
        if (this.state.dataLoaded) {
            return (
                <div className='topLevel'>
                    <LapList laps={this.state.laps} onLapSubmit={this.handleLapSubmit} />
                </div>
            );
        } else {
            return null;
        }
    };
};

TopLevel.childContextTypes = {
    refData: PropTypes.any.isRequired,
};


ReactDOM.render(
    <TopLevel pollInterval={2000} />,
    document.getElementById('content')
);
