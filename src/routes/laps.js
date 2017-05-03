/**
 * Express router to deal with incoming lap REST requests.
 * @module src/routes/laps
 * @private
 */

const express = require('express');
let log = require('../utils/logger.js').getLogger();
const db = require('../utils/dbConnection.js');
const lapVal = require('../validation/lap.js');


/**
 * Express router to mount lap related functions on.
 * @type {object}
 * @const
 * @namespace lapsExpressRoutes
 * @private
 */
const router = new express.Router();
router.use((req, res, next) => {
    next();
});


/**
 * GET: Route returning existing Laps from database.
 * @name GET/api/laps
 * @function
 * @memberof module:src/routes/laps~lapsExpressRoutes
 * @inner
 * @param {Request} req - Express request
 * @param {Result} res - Express response.
 * @return {HTTP_body} the result of the query as a json payload containing all laps (even if there are none).
 * @return {HTTP_response} HTTP-200 if OK, HTTP-500 if anything went wrong.
 * @private
 */
router.get('/', (req, res) => {
    db.get('laps')
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            log.error(err);
            res.status(500).send('');
        });
});


/**
 * POST: Route to write a new inbound lap to the database.
 * @name POST/api/laps
 * @function
 * @memberof module:src/routes/laps~lapsExpressRoutes
 * @inner
 * @param {Request} req - Express request
 * @param {Result} res - Express response.
 * @return {HTTP_response} HTTP-201 if OK, HTTP-500 if anything went wrong.
 * @private
 */
router.post('/', (req, res) => {
    lapVal.parseRequest(req)
        .then((lapData) => {
            db.insertOne('laps', lapData);
            res.status(201).send('');
        })
        .catch((err) => {
            log.error(err);
            res.status(500).send('');
        });
});


module.exports = router;
