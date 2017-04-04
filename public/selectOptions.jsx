import React from 'react';

const SelectOpts = (props) => {
    let options = props['options'];
    let reactOptions = [];
    if (options !== undefined) {
        for (let i = 0; i < options.length; i++) {
            reactOptions.push(<option key={i} value={options[i]}>{options[i]}</option>);
        }
    };

    return (
        <select onChange={(e) => props.onChange(e)}>{reactOptions}</select>
    );
};

export default SelectOpts;
