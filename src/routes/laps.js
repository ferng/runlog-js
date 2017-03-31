const express = require('express');
const router = new express.Router();
let log = require('../utils/logger.js').getLogger();
const db = require('../utils/dbConnection.js');
const lapVal = require('../validation/lap.js');

module.exports = router;

router.use((req, res, next) => {
    next();
});


router.get('/', (req, res) => {
    db.get('laps')
        .then((data) => res.json(data))
        .catch((err) => log.error(err));
});


router.post('/', (req, res) => {
    lapVal.parseRequest(req)
        .then((results) => db.insertOne('laps', results))
        .catch((err) => log.error(err));
});
