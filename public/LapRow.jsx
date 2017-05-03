import React from 'react';
import {Lap} from './Lap.jsx';


class LapRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let lapData = this.props.data;
        let lapNodes = lapData.map((lap) => {
            // console.log(lap.id, lap.editLap);
            return (
                <Lap id={lap.id} unit={lap.unit} time={lap.time} key={lap.id} distance={lap.distance} editLap={lap.editLap} onLapSubmit={lap.onLapSubmit} onLapEdit={lap.onLapEdit}/>
            );
        });

        return (
            <div className='row'>
                {lapNodes}
            </div>
        );
    }
};


export {
    LapRow,
};
