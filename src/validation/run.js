/**
 * Validates whether a lap looks like a lap or whether it's full of junk.
 * @module src/validation/run
 */

const common = require('./common.js');
const log = require('../utils/logger.js').getLogger();

//update doco this doens't return a promise, and neither should any other validation stuff it is not slow as it does not rely on anything external, test it all first then re-work it
/**
 * Parses a request with lap data to see whether that data is valid or not.
 * @param {object} data - A data object being validated
 * @return {Promise}
 * resolve returns parsed and validated data as a {@link module:public/types~lap|lap}.<br>
 * reject if the validation failed somehow.
 */
function validateRequest(data) {
    const dataType = Object.keys(data)[0];
    switch (dataType) {
        case 'lap':
            return validateLap(data);
        case 'activity':
            return validateActivity(
                req.body.id,
                req.body.activity,
                req.body.kit,
                req.body.weather,
                req.body.feels,
                req.body.effort);
        default:
            return null;
    }
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
            reject('failed lap validation');
        }
    });
};


/**
 * Parses a request with activity data to see whether that data is valid or not.
 * @param {number} id - Activity id
 * @param {string} activity - The activity the set of Laps will define
 * @param {string} kit - The kit I relied on for this activity
 * @param {string} weather - What was the weather like
 * @param {string} feels - What did the temperature feel like
 * @param {string} effort - And what was the perceived effort
 * @return {Promise}
 * resolve returns parsed and validated data as a {@link module:public/types~lap|lap}.<br>
 * reject if the validation failed somehow.
 */
function validateActivity(id, activity, kit, weather, feels, effort) {
    log.debug('Parsing activity id:[%s] activity:[%s]kit:[%s] weather:[%s] feels:[%s] effort:[%s]', id, activity, kit, weather, feels, effort);
    return new Promise((resolve, reject) => {
        if (isValidActivity(id, activity, kit, weather, feels, effort)) {
            let payload = {
                id: id,
                activity: activity,
                kit: kit,
                weather: weather,
                feels: feels,
                effort: effort,
            };
            resolve(payload);
        } else {
            reject('failed activity validation');
        }
    });
};


function isValidLap(lap) {
    return (isValidDistance(lap['lap'].distance) &&
        isValidTime24(lap['lap'].time));
};


function isValidActivity(id, unit, distance, time) {
    return true;
};


function isValidDistance(dist) {
    return (typeof (dist) != 'undefined' &&
        common.isFloatExpr(dist) &&
        dist > 0);
};


function isValidTime24(time) {
    return (typeof (time) != 'undefined' &&
        common.isTimeExpr24(time));
};


module.exports = {
    validateRequest: validateRequest,
    validateLap: validateLap,
};
