import React from 'react';

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
