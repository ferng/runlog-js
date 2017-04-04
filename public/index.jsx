import React from 'react';
import ReactDOM from 'react-dom';
import {LapList, LapForm} from './lap.jsx';
import {get, post} from './ajaxSvcs.jsx';

const optionTypes = ['unit', 'activity', 'kit', 'weather', 'temperature', 'effort'];


const getSelectOpts = () => {
    return new Promise((resolve, reject) => {
        let vals = [];
        get('/api/svcs/selectOpts/' + optionTypes.toString())
            .then((data) => {
                let unitOpts = data['unit'];
                for (let i = 0; i < unitOpts.length; i++) {
                    vals.push(unitOpts[i]['desc']);
                }
                resolve(vals);
            })
            .catch((error) => {
                alert('Error retrieving data, please try later.');
            });
    });
};


const getLaps = () => {
    return new Promise((resolve, reject) => {
        get('/api/laps?_=1')
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                alert('Error retrieving data, please try later.');
            });
    });
};


const postNewLap = (body) => {
    return new Promise((resolve, reject) => {
        post('/api/laps', body)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                alert('Error saving data, please try later.');
                reject(error);
            });
    });
};


class TopLevel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
        TopLevel.context = this;
    }

    componentDidMount() {
        getSelectOpts()
            .then((data) => {
                TopLevel.context.setState({options: data});
            })
            .then(getLaps)
            .then((data) => {
                TopLevel.context.setState({data: data});
            })
            ;
    };

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
        console.log(this.state.data);
        return (
            <div className="topLevel">
                <h1>-</h1>
                <LapList data={this.state.data} />
                <LapForm onLapSubmit={this.handleLapSubmit} options={this.state.options} />
            </div>
        );
    }
};


ReactDOM.render(
    <TopLevel url="/api/laps" pollInterval={2000} />,
    document.getElementById('content')
);
