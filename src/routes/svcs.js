/**
 * Express router to deal with incoming service REST requests.
 * @module src/routes/svcs
 * @private
 */

const express = require('express');
let log = require('../utils/logger.js').getLogger();
const db = require('../utils/dbConn.js');

/**
 * Express router to mount general system related functions on.
 * @type {object}
 * @const
 * @namespace svcsExpressRoutes
 * @private
 */
const router = new express.Router();
router.use((req, res, next) => {
    next();
});


/**
 * GET: Route returning existing dropDown options from database.
 * @name GET/api/svcs/selectOpts
 * @function
 * @memberof module:src/routes/svcs~svcsExpressRoutes
 * @inner
 * @param {Request} req - Express request
 * @param {Result} res - Express response.
 * @return {HTTP_body} the result of the query as a json payload containing all dropDown option values (even if there are none).
 * @return {HTTP_response} HTTP-200 if OK, HTTP-500 if anything went wrong.
 * @private
 */
router.get('/selectOpts/*', (req, res) => {
    let optionsTypes = req.params[0].split(',');
    let selectOptions = {};

    Promise.all(optionsTypes.map((optionType) => {
        return db.get(optionType, {})
            .then((data) => selectOptions[optionType] = data);
    }))
    .then(() => {
        log.debug('Select options retrieved.');
        res.json(selectOptions);
    })
    .catch((err) => {
        log.error(err);
        res.status(500).send('');
    });
});


module.exports = router;
