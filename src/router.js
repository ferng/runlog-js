const express = require('express');
const router = new express.Router();
let log = require('./utils/logger.js').getLogger();
const db = require('./utils/dbConnection.js');
const validator = require('./validation/lap.js');

module.exports = router;

router.use((req, res, next) => {
    log.debug(req.originalUrl);
    next();
});


router.get('/', (req, res) => {
    db.getAll('laps')
        .then((data) => res.json(data))
        .catch((err) => log.error(err));
});


router.post('/', (req, res) => {
    validator.parseRequestLap(req)
        .then((results) => db.insertOne('laps', results))
        .catch((err) => log.error(err));
});
