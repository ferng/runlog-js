const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routeLaps = require('./src/routes/laps.js');
const routeSvcs = require('./src/routes/svcs.js');
const config = require('./config.js');
const log = require('./src/utils/logger.js').getLogger();
const db = require('./src/utils/dbConnection.js');


// initialize mongo db connection pool
db.initPool()
    .catch((err) => {
        log.fatal(err);
        process.exit(1);
    });


// initialize app server
app.set('port', config.runlog.port);
app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(requestHandler);
app.use('/api/laps', routeLaps);
app.use('/api/svcs', routeSvcs);
app.listen(app.get('port'));
log.info('Server started: http://localhost:' + app.get('port') + '/');


// handler
function requestHandler(req, res, next) {
    log.debug('Inbound request: ' + req.originalUrl);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
};
