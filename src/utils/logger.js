const bunyan = require('bunyan');
const config = require('../../config.js');

let logger;

module.exports = {
    getLogger: getLogger,
};


function getLogger() {
    if (typeof logger == 'undefined') {
        init();
    }
    return logger;
};


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
