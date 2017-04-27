import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {LapList} from './lapList.jsx';
import {LapForm} from './lapForm.jsx';
import {getLaps, getRefData, postNewLap} from './lapSvcs.jsx';


class TopLevel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [], refData: {}};
        TopLevel.context = this;
    }

    componentDidMount() {
        getRefData()
            .then((data) => {
                TopLevel.context.setState({refData: data});
            })
            .then(getLaps)
            .then((data) => {
                TopLevel.context.setState({data: data});
                TopLevel.context.setState({dataLoaded: true});
            })
            ;
    };

    getChildContext() {
        return {refData: TopLevel.context.state.refData};
    }

    handleLapSubmit(lap) {
        let laps = TopLevel.context.state.data;
        lap.id = Date.now();
        let newLaps = laps.concat([lap]);

        postNewLap(lap)
            .then(() => {
                TopLevel.context.setState({data: newLaps});
            });
    }

    render() {
        if (this.state.dataLoaded) {
            return (
                <div className='topLevel'>
                    <LapList data={this.state.data} />
                    <LapForm onLapSubmit={this.handleLapSubmit} />
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
