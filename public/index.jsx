import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {LapList} from './LapList.jsx';
import {ActivityForm} from './ActivityForm.jsx';
import {getItems, getRefData} from './lapDataSvcs.jsx';
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
            .then((data) => getItems('lap'))
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

    handleLapSubmit(lapData) {
        let laps = TopLevel.context.state.laps;
        laps.set(lapData['lap'].id, lapData['lap']);

        TopLevel.context.setState({laps: laps});
    }

    // handleActivitySubmit(activity) {
    //     let activities = TopLevel.context.state.activities;
    //     activities.set(activities.id, activities);

    //     TopLevel.context.setState({activities: activities});
    // }

    render() {
        if (this.state.dataLoaded) {
            return (
                <div className='topLevel'>
                      <ActivityForm />
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
