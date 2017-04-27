/**
 * Provides common services used for lap data entry and rendering.
 * @module public/lapSvcs
 */

import {get, post} from './ajaxSvcs.jsx';

const optionTypes = ['unit', 'activity', 'kit', 'weather', 'temperature', 'effort'];


/**
 * Retrieves application wide reference data from the backend server.
 * @return {Promise}
 * resolve returns retrieved data.<br>
 * reject on connectivity or issues with the server at the endpoint.
 */
const getRefData = () => {
    return new Promise((resolve, reject) => {
        get('/api/svcs/selectOpts/' + optionTypes.toString())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                alert('Error retrieving data, please try later.');
            });
    });
};


/**
 * Retrieves lap data from the backend server.
 * @return {Promise}
 * resolve returns retrieved data.<br>
 * reject on connectivity or issues with the server at the endpoint.
 */
const getLaps = () => {
    return new Promise((resolve, reject) => {
        get('/api/laps?_=1')
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                alert('Error retrieving data, please try later.');
            });
    });
};


/**
 * Uses an ajax call to send a new lap to the backend server for storage.
 * @param {JsonObject} body - The data we are sending to the server to save
 * @return {Promise}
 * reject on connectivity or issues with the server at the endpoint.
 */
const postNewLap = (body) => {
    return new Promise((resolve, reject) => {
        post('/api/laps', body)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                alert('Error saving data, please try later.');
                reject(error);
            });
    });
};


/**
 * Parses reference data objects and creates a map of unit names and multipliers to convert to/from miles.
 * @param {Object} optionRefData - Distance reference data
 * @return {String[]} An array containing the name of the distance units.
 */
const prepSelectOpts = (optionRefData) =>{
    return getKeys(prepDistanceMultiplier(optionRefData));
};


/**
 * Parses reference data objects and creates a map of unit names and multipliers to convert to/from miles.
 * @param {Map} unitMultipliers - A map containing unit Names and corresponding multipliers
 * @return {String[]} An array containing the name of the distance units.
 */
const getKeys = (unitMultipliers) => {
    let keys = [];
    const multIter = unitMultipliers.keys();
    for (let k of multIter) {
        keys.push(k);
    }

    return keys;
};


/**
 * Parses reference data objects and creates a map of unit names and multipliers to convert to/from miles.
 * @param {Object} optionRefData - Distance reference data
 * @return {Map} A map containing unit Names and corresponding multipliers (if any are present).
 */
const prepDistanceMultiplier = (optionRefData) => {
    let multipliers = new Map();
    if (optionRefData !== undefined) {
        optionRefData['unit'].map((unit) => {
            multipliers.set(unit['desc'], unit['conversion']);
        });
    }
    return multipliers;
};


/**
 * Works out miles per hour and minutes per mile for a given distance/time using the appropriate distance conversion unit.
 * @param {String|Float} unitMult - Multiplier to convert to Miles
 * @param {String|Float} distance - Distance convered in the lap
 * @param {String} time - Time taken to cover the lap
 * @return {Object} An object containing mph (mile per hour) and mins (minutes per mile).
 */
const calcTimes = (unitMult, distance, time) => {
    let hh = Number.parseInt(time.substr(0, 2)) * 60 * 60;
    let mm = Number.parseInt(time.substr(3, 2)) * 60;
    let ss = Number.parseInt(time.substr(6, 2));
    let miles = parseFloat(distance) * parseFloat(unitMult);
    let mph = Math.round(((miles / (hh + mm + ss)) * 60 * 60) * 100) / 100;

    let mins = '00:00';
    if (mph > 0) {
        let minsPM = 60 / mph;
        let secsPM = Math.round((((minsPM) - Number.parseInt(minsPM)) * 60));
        secsPM = (secsPM < 10) ? '0' + secsPM : secsPM;
        mins = Number.parseInt(minsPM) + ':' + secsPM;
    }
    return {mph: mph, mins: mins};
};


/**
 * Rendering utility for React which splits the total number of laps into something we can use on screen.
 * @param {Laps[]} lapData - An array with all the laps
 * @return {Rows[]} An array containing of rows each one containing an array of three laps each.
 */
const splitRows = (lapData) => {
    let rows = [];
    let thisRow = [];
    for (let i = 0; i < lapData.length; i++) {
        thisRow.push(lapData[i]);
        if ((i + 1) % 3 == 0) {
            rows.push(thisRow);
            thisRow = [];
        }
    }
    if (thisRow.length > 0) {
        rows.push(thisRow);
    }

    return rows;
};


export {
    getLaps,
    getRefData,
    postNewLap,
    getKeys,
    prepSelectOpts,
    prepDistanceMultiplier,
    calcTimes,
    splitRows,
};
