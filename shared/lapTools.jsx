/**
 * Provides <comm></comm>on services used for lap data entry and rendering.
 * @module common/lap
 */
const commonVal = require('./validation.js');

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
 * @param {string} temp - What did the temperature feel like
 * @param {string} effort - And what was the perceived effort
 * @return {object} An Activity with the data provided or blanks if none.
 */
const createActivity = (id=0, activity='--', kit='--', weather='--', temp='--', effort='--') => {
    return ({id: id, activity: activity, kit: kit, weather: weather, temp: temp, effort: effort});
};


/**
 * Parses a request with lap data to see whether that data is valid or not.
 * @param {object} lap - The lap to be validated
 * @return {Promise}
 * resolve returns parsed and validated data as a {@link module:public/types~lap|lap}.<br>
 * reject if the validation failed somehow.
 */
function validateLap(lap) {
    return new Promise((resolve, reject) => {
        if (isValidLap(lap)) {
            resolve(lap);
        } else {
            reject('bad');
        }
    });
};


function isValidLap(lap) {
    return (commonVal.isValidDistance(lap['lap'].distance) &&
        commonVal.isValidTime24(lap['lap'].time));
};

/**
 * Creates a brand new lap object with the provided data or with blank default data if none is provided.
 * @param {number} id - Lap id
 * @param {string} time - Time taken to complete the lap
 * @param {float} distance - What was the distance convered
 * @param {string} unit - What was the distance unit: mile, metre, etc
 * @return {object} A Lap with the data provided or blanks if none.
 */
function isValidActivity(id, time, distance, unit) {
    return true;
};

// /**
//  * Parses a request with activity data to see whether that data is valid or not.
//  * @param {number} id - Activity id
//  * @param {string} activity - The activity the set of Laps will define
//  * @param {string} kit - The kit I relied on for this activity
//  * @param {string} weather - What was the weather like
//  * @param {string} temp - What did the temperature feel like
//  * @param {string} effort - And what was the perceived effort
//  * @return {Promise}
//  * resolve returns parsed and validated data as a {@link module:public/types~lap|lap}.<br>
//  * reject if the validation failed somehow.
//  */
// function validateActivity(id, activity, kit, weather, temp, effort) {
//     log.debug('Parsing activity id:[%s] activity:[%s]kit:[%s] weather:[%s] temp:[%s] effort:[%s]', id, activity, kit, weather, temp, effort);
//     return new Promise((resolve, reject) => {
//         if (isValidActivity(id, activity, kit, weather, temp, effort)) {
//             let payload = {
//                 id: id,
//                 activity: activity,
//                 kit: kit,
//                 weather: weather,
//                 temp: temp,
//                 effort: effort,
//             };
//             resolve(payload);
//         } else {
//             reject('bad');
//         }
//     });
// };


export {
    createLap,
    createActivity,
    validateLap,
    isValidLap,
    isValidActivity,
};
