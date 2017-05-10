import React from 'react';
import {LapForm} from './LapForm.jsx';
import {Lap} from './Lap.jsx';


class LapField extends React.Component {
    constructor(props) {
        super(props);
        LapField.context = this;
    }

    render() {
        let lap = this.props.lap;
        let editLap = this.props.editLap;

        if (editLap) {
            return (
                <LapForm lap={lap} onLapSubmit={LapField.context.props.onLapSubmit} />
            );
        } else {
            return (
                <Lap lap={lap} onLapEdit={LapField.context.props.onLapEdit} />
            );
        }
    }
}


export {
    LapField,
};
