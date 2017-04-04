const express = require('express');
const router = new express.Router();
let log = require('../utils/logger.js').getLogger();
const db = require('../utils/dbConnection.js');

const selectFields = ['desc'];

module.exports = router;

router.use((req, res, next) => {
    next();
});

// retrive dropdown select options
router.get('/selectOpts/*', (req, res) => {
    let optionsTypes = req.params[0].split(',');
    let selectOptions = {};

    Promise.all(optionsTypes.map((optionType) => {
        return db.get('select_' + optionType, selectFields)
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
