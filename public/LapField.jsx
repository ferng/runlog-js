import React from 'react';
import {LapForm} from './LapForm.jsx';
import {Lap} from './Lap.jsx';

/**
 * A React component to display or enter lap data.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} lap - Object defining a {@link module:public/types~lap|lap}
 * @property {function} onLapEdit - Callback function to execute when a lap being displayed is clicked for editing
 * @property {function} onLapSubmit - Callback function to execute when a lap being entered or edited is submitted for processing
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
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
