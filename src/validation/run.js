/**
 * Validates whether a lap looks like a lap or whether it's full of junk.
 * @module src/validation/run
 */

const common = require('./common.js');

// update doco this doens't return a promise, and neither should any other validation stuff it is not slow as it does not rely on anything external, test it all first then re-work it
/**
 * Parses a request with lap data to see whether that data is valid or not.
 * @param {object} data - A data object being validated
 * @return {Promise}
 * resolve returns parsed and validated data as a {@link module:public/types~lap|lap}.<br>
 * reject if the validation failed somehow.
 */
function validateRequest(type, data) {
  switch (type) {
    case 'lap':
      return validateLap(data);
    case 'session':
      return validateSession(data);
    default:
      return null;
  }
}


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
      reject(new Error('failed lap validation'));
    }
  });
}


function validateSession(session) {
  return new Promise((resolve, reject) => {
    if (isValidSession(session)) {
      resolve(session);
    } else {
      reject(new Error('failed session validation'));
    }
  });
}


/**
 * Parses a request with activity data to see whether that data is valid or not.
 * @param {string} activity - The activity the set of Laps will define
 */
function isValidSession(session) {
  return (isValidTime24(session.time));
}


function isValidLap(lap) {
  return (isValidDistance(lap.distance) &&
        isValidTime24(lap.time));
}


function isValidDistance(dist) {
  return (typeof (dist) !== 'undefined' &&
        common.isFloatExpr(dist) &&
        dist > 0);
}


function isValidTime24(time) {
  return (typeof (time) !== 'undefined' &&
        common.isTimeExpr24(time));
}


module.exports = {
  validateRequest,
  validateLap,
};
