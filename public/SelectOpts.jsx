/**
 * A React component which displays a drop down list.
 * @module public/selectOpts
 */

import React from 'react';


/**
 * Creates a React dropdown element from the dropdown data provided by React properties.
 * @param {Object} dropDown - Object with <options[]>, <onChange> callback function and <value>.
 * @return {Object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
const SelectOpts = (dropDown) => {
    let id = dropDown['id'];
    let options = dropDown['options'];
    let onChange = dropDown['onChange'];
    let value = dropDown['value'];

    if (!(options && options.constructor === Array &&
        onChange && onChange.constructor === Function &&
        value && value.constructor === String)) {
        return null;
    }

    let reactOptions = options.map((option, index) => {
        return <option key={index} value={option}>{option}</option>;
    });

    return (
        <select id={id} onChange={(e) => onChange(e)} value={value}>{reactOptions}</select>
    );
};


export default SelectOpts;
