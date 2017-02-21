let log = require('../../src/utils/logger.js').getLogger();

exports.json = function(jsonBody) {
    log.debug(jsonBody);
    return jsonBody;
};

