/**
 * Provides common services used for lap data entry and rendering.
 * @module public/lapTools
 */

import React from 'react';
import {LapField} from './LapField.jsx';
import {LapRow} from './LapRow.jsx';


/**
 * Rendering utility which splits the total number of laps into React rows of three laps each to use on screen.
 * @param {Object[]} laps - An array with all the {@link module:public/types~lap|laps}
 * @param {Function} editCallback - CallBack function when a lap is clicked for editing
 * @param {Function} submitCallback - CallBack function when lap being edited is submitted for saving
 * @return {LapRow[]} An array containing of rows each one containing an array of three laps each.
 */
const lapsToReactRows = (laps, editCallback, submitCallback) => {
    let rows = [];
    let thisRow = [];

    for (let i = 0; i < laps.length; i++) {
        let lap = lapToReact(laps[i], editCallback, submitCallback);
        thisRow.push(lap);
        if ((i + 1) % 3 == 0) {
            rows.push(thisRow);
            thisRow = [];
        }
    }
    if (thisRow.length > 0) {
        rows.push(thisRow);
    }

    return rowsToReact(rows);
};


/**
 * Rendering utility which converts a data lap into a React LapField for display.
 * @param  {object} lap - The {@link module:public/types~lap|lap} to convert
 * @param {Function} editCallback - callBack function when a lap is clicked for editing
 * @param {Function} submitCallback - callBack function when lap being edited is submitted for saving
 * @return {LapField} A LapField React component.
 * @private
 */
const lapToReact = (lap, editCallback, submitCallback) => {
    return React.createElement(LapField, {lap: lap, key: lap.id, editLap: lap.editLap, onLapEdit: editCallback, onLapSubmit: submitCallback});
};


/**
 * Rendering utility which converts an array of LapField arrays into an array of React LapRows for display.
 * @param {Object[]} rows - An array of LapField arrays (one for each row)
 * @return {LapRow[]} An array containing of rows each one containing an array of three laps each.
 * @private
 */
const rowsToReact = (rows) => {
    let lapNodes = rows.map((lapRow, index) => {
        return (
            <LapRow data={lapRow} key={index} />
        );
    });

    return lapNodes;
};


/**
 * Creates a brand new lap object with the provided data or with blank default data if none is provided.
 * @param {number} id - Lap id
 * @param {string} time - Time taken to complete the lap
 * @param {float} distance - What was the distance convered
 * @param {string} unit - What was the distance unit: mile, metre, etc
 * @return {object} A Lap with the data provided or blanks if none.
 */
const createLap = (id=0, time='00:00:00', distance=0, unit='--') => {
    return ({id: id, time: time, distance: distance, unit: unit});
};


/**
 * Creates a brand new activity object with the provided data or with blank default data if none is provided.
 * @param {number} id - Activity id
 * @param {string} activity - The activity the set of Laps will define
 * @param {string} kit - The kit I relied on for this activity
 * @param {string} weather - What was the weather like
 * @param {string} feels - What did the temperature feel like
 * @param {string} effort - And what was the perceived effort
 * @return {object} An Activity with the data provided or blanks if none.
 */
const createActivity = (id=0, activity='--', kit='--', weather='--', feels='--', effort='--') => {
    return ({id: id, activity: activity, kit: kit, weather: weather, feels: feels, effort: effort});
};


/**
 * Converts an array of lap data into a Map for quicker lap access
 * @param {object[]} laps - An array of {@link module:public/types~lap|laps}
 * @return {object.<number, object>} A map of all laps with key=lap.id, value=lap.
 */
const lapArrayToMap = (laps) => {
    let lapMap = new Map;
    laps.map((lap) => {
        lapMap.set(lap.id, lap);
    });
    return lapMap;
};


/**
 * Works out miles per hour and minutes per mile for a given distance/time using the appropriate distance conversion unit.
 * @param {string|float} unitMult - Multiplier to convert to Miles
 * @param {string|float} distance - Distance convered in the lap
 * @param {string} time - Time taken to cover the lap
 * @return {object} An object containing mph (mile per hour) and mins (minutes per mile).
 */
const calcTimes = (unitMult, distance, time) => {
    let hh = Number.parseInt(time.substr(0, 2)) * 60 * 60;
    let mm = Number.parseInt(time.substr(3, 2)) * 60;
    let ss = Number.parseInt(time.substr(6, 2));
    let miles = parseFloat(distance) * parseFloat(unitMult);

    let mph = 0;
    let mins = '00:00';

    if (miles === undefined || miles === NaN) {
        console.warn('Please raise an issue at https://github.com/ferng/runlog-js/issues with these details: "MPH calculation failed:', unitMult, distance, time, '"');
    }

    if (miles > 0) {
        mph = Math.round(((miles / (hh + mm + ss)) * 60 * 60) * 100) / 100;
        if (mph > 0) {
            let minsPM = 60 / mph;
            let secsPM = Math.round((((minsPM) - Number.parseInt(minsPM)) * 60));
            secsPM = (secsPM < 10) ? '0' + secsPM : secsPM;
            mins = Number.parseInt(minsPM) + ':' + secsPM;
        }
    }
    return {mph: mph, mins: mins};
};


/**
 * Parses a map and creates an array of its keys.
 * @param {Object.<String, Float>} map - A map
 * @return {string[]} An array containing the keys in the map.
 */
const getKeys = (map) => {
    let keys = [];

    const iter = map.keys();
    for (let k of iter) {
        keys.push(k);
    }

    return keys;
};


/**
 * Parses a map and creates an array of its values.
 * @param {Object.<String, Float>} map - A map
 * @return {Object[]} An array containing the values in the map.
 */
const getValues = (map) => {
    let values = [];

    const iter = map.values();
    for (let v of iter) {
        values.push(v);
    }

    return values;
};


export {
    lapsToReactRows,
    createLap,
    createActivity,
    lapArrayToMap,
    calcTimes,
    getKeys,
    getValues,
};
