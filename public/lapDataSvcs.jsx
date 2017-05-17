/**
 * Provides common services used to process retrieved data and to save it.
 * @module public/lapDataSvcs
 */

import {get, post} from './ajaxSvcs.jsx';
import {getKeys} from './lapTools.jsx';

const optionTypes = ['unit', 'activity', 'kit', 'weather', 'temperature', 'effort'];


/**
 * Uses an ajax call to retrieve application wide reference data from the backend server.
 * @return {Promise}
 * resolve returns a Map with {@link module:public/types~refData|retrieved data}.<br>
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
 * Uses an ajax call to retrieve lap data from the backend server.
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
 * @param {body} body - The data we are sending to the server to save
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
 * @param {object} optionRefData - Distance reference data
 * @return {Object.<String, Float>} A map containing unit Names and {@link module:public/types~multipliers|corresponding multipliers} (if any are present).
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
 * Parses the distance multiplier map and gets the unit names to use as Select Options.
 * @param {Object.<String, Float>} optionRefData - Distance multipliers data
 * @return {string[]} An array containing the name of the distance units.
 */
const prepSelectOpts = (optionRefData) => {
    return getKeys(prepDistanceMultiplier(optionRefData));
};


export {
    getRefData,
    getLaps,
    postNewLap,
    prepDistanceMultiplier,
    prepSelectOpts,
};
