const config = {};

// server
config.runlog = {};
config.runlog.port = 3000;

// environment
// config.runlog.env = 0;
// config.runlog.env = 1;

// database - sqlite
config.sqlite = {};
config.sqlite.file = './runlogDb';
// config.sqlite.file = ':memory:';

// logger
config.logger = {};
config.logger.appname = 'runlog';
config.logger.file_name = 'runlog.log.json';
config.logger.file_level = 'trace';
config.logger.console_level = 'trace';

module.exports = config;
