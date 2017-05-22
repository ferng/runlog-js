/**
 * System logger. Log file location and current log level are specified in in config.js.
 * Uses bunyan to carry out the actual logging, so the usual log levels apply.
 * @see https://github.com/trentm/node-bunyan
 *
 * @module common/logger
 *
 * @example
 * // Needed once at the top of the file.
 * const log = require('../common/logger.js').getLogger();
 *
 * // Any place in the code where logging is required.
 * log.debug('Attempting connection to mongodb on: ' + url);
 */

const bunyan = require('bunyan');
const config = require('../config.js');

let logger;


/**
 * Get a logger object which can then be used to log messages.
 * @return {Logger}
 */
function getLogger() {
    if (typeof logger == 'undefined') {
        init();
    }
    return logger;
};


/**
 * Configures and creates a bunyan logger which is shared by the app.
 * @private
 */
function init() {
    logger = bunyan.createLogger({
        name: config.logger.appname,
        src: true,
        streams: streams,
    });
};


const streams = [
    {
        path: config.logger.file_name,
        level: config.logger.file_level,
    },
    {
        stream: process.stdout,
        level: config.logger.console_level,
    },
];


module.exports = {
    getLogger: getLogger,
};
