const express = require('express');
const bodyParser = require('body-parser');
const routeRuns = require('./src/routes/runs.js');
const routeSvcs = require('./src/routes/svcs.js');
const config = require('./config.js');
const log = require('./src/utils/logger.js').getLogger();
const db = require('./src/utils/dbConn.js');
const dbInit = require('./src/utils/dbInit.js');

const app = express();

// initializa database if not already there
async function init() {
}

// handler
function requestHandler(req, res, next) {
  log.debug('Inbound request: ', req.originalUrl);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
}

// initialize app server
app.set('port', config.runlog.port);
app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestHandler);
app.use('/api/runs', routeRuns);
app.use('/api/svcs', routeSvcs);
app.listen(app.get('port'));
log.info('Server started: http://localhost: {}/', app.get('port'));


init();

