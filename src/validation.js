/**
 * Validates whether a lap looks like a lap or whether it's full of junk.
 * @module src/validation/run
 */

const lapVal = require('../common/lap.jsx');
const log = require('../common/logger.js').getLogger();


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
            return lapVal.validateLap(data);
        // case 'activity':
        // log.error('there');
        //     return validateActivity(
        //         req.body.id,
        //         req.body.activity,
        //         req.body.kit,
        //         req.body.weather,
        //         req.body.temp,
        //         req.body.effort);
        default:
            return null;
    }
};


module.exports = {
    validateRequest: validateRequest,
};
