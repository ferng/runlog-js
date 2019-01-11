const express = require('express');
const bodyParser = require('body-parser');
const routeRuns = require('./src/routes/runs.js');
const routeSvcs = require('./src/routes/svcs.js');
const config = require('./config.js');
const log = require('./src/utils/logger.js').getLogger();
const db = require('./src/utils/dbConn.js');
const dbInit = require('./src/utils/dbInit.js');
const path = require('path');
const app = express();

// initializa database if not already there
async function init() {
  try {
    await db.initPool();
    const result = await db.get('sqlite_master', { type: 'table', name: 'effort' });
    if (result.length === 0) {
      log.debug('New system, initialising schema');
      dbInit.init();
    }
  } catch (err) {
    log.fatal(err);
    process.exit(1);
  }
}

// handler
function requestHandler(req, res, next) {
  log.debug('Inbound request:', req.method, req.originalUrl);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
}

function requestPage(req, res) {
  log.debug('Inbound request:', req.method, req.originalUrl);
  res.sendFile(`${__dirname}/index.html`);
}

// initialize app server
app.set('port', config.runlog.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:  false }));
app.use('/', express.static(__dirname));
app.use(requestHandler);
app.use('/api/runs', routeRuns);
app.use('/api/svcs', routeSvcs);
app.get('*', requestPage); 
app.listen(app.get('port'));

log.info('Server started: http://localhost: {}/', app.get('port'));


init();

