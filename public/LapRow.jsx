import React from 'react';

/**
 * A React component to group a set of data within a Row (well a div really).
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} data - One or more React Components to be displayed within the row.
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
