const bunyan = require('bunyan');
const config = require('../../config.js');

let logger;

let init = function() {
    logger = bunyan.createLogger({
        name: config.logger.appname,
        src: true,

    streams: [
        {
            path: config.logger.file_name,
            level: config.logger.file_level,
        },
        {
            stream: process.stdout,
            level: config.logger.console_level,
        },
    ],
});
};

module.exports = {
    logger: undefined,

    getLogger: function() {
        if (typeof logger == 'undefined') {
            init();
        }
        return logger;
    },
};

