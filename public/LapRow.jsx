import React from 'react';

/**
 * A React component to group a set of data within a Row (well a div really).
 * @param {props} props - object containing the data to display within the row
 * @property {object} data - One or more React Components.
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class LapRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='row'>
                {this.props.data}
            </div>
        );
    }
};


export {
    LapRow,
};
