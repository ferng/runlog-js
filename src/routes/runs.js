/**
 * Express router to deal with incoming lap REST requests.
 * @module src/routes/runs
 * @private
 */

const express = require('express');
const log = require('../utils/logger.js').getLogger();
const db = require('../utils/dbConn.js');
const runVal = require('../validation/run.js');


/**
 * Express router to mount run related functions on.
 * @type {object}
 * @const
 * @namespace runsExpressRoutes
 * @private
 */
const router = new express.Router();
router.use((req, res, next) => {
  next();
});


/**
 * GET: Route returning existing Laps from database.
 * @name GET/api/runs
 * @function
 * @memberof module:src/routes/runs~runsExpressRoutes
 * @inner
 * @param {Request} req - Express request
 * @param {Result} res - Express response.
 * @return {HTTP_body} the result of the query as a json payload containing all laps (even if there are none).
 * @return {HTTP_response} HTTP-200 if OK, HTTP-500 if anything went wrong.
 * @private
 */
router.get('/*', (req, res) => {
  const dataType = req.path.slice(1);
  db.get(dataType, req.query)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      log.error(err);
      res.status(500).send('');
    });
});


// validate should not be a promise, the d stuff should be wrapped up in it
/**
 * POST: Route to write a new inbound lap to the database.
 * @name POST/api/runs
 * @function
 * @memberof module:src/routes/runs~runsExpressRoutes
 * @inner
 * @param {Request} req - Express request
 * @param {Result} res - Express response.
 * @return {HTTP_response} HTTP-201 if OK, HTTP-500 if anything went wrong.
 * @private
 */
router.post('/*', (req, res) => {
  const dataType = req.path.slice(1);
  runVal.validateRequest(dataType, req.body)
    .then((data) => {
      db.insertOne(dataType, data)
        .then((id) => {
          res.status(201).send({ id });
        })
        .catch((err) => {
          log.error(err);
          res.status(500).send('');
        });
    })
    .catch((err) => {
      log.error(err);
      res.status(500).send('');
    });
});

router.delete('/*', (req, res) => {
  const dataType = req.path.slice(1);
  db.remove(dataType, req.query)
    .then(() => {
      res.status(200).send('');
    })
    .catch((err) => {
      log.error(err);
      res.status(500).send('');
    });
});

module.exports = router;
