/**
 * A React component which displays a drop down list.
 * @module public/selectOptions
 */

import React from 'react';


/**
 * Gets an array of data to display in a drop down box.
 * @param {String[]} dropDownItems - An array of items to be displayed in the drop down
 * @return {Object} A React element that will be rendered on the browser.
 */
const SelectOpts = (dropDownItems) => {
    let options = dropDownItems['options'];
    let reactOptions = [];
    if (options !== undefined) {
        for (let i = 0; i < options.length; i++) {
            reactOptions.push(<option key={i} value={options[i]}>{options[i]}</option>);
        }
    };

    return (
        <select onChange={(e) => dropDownItems.onChange(e)} value={dropDownItems['value']}>{reactOptions}</select>
    );
};


export default SelectOpts;
