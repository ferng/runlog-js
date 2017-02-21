const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.js');
const log = require('../../src/utils/logger.js').getLogger();

let conn = undefined;

const url = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database;

module.exports = {
    initPool: intiPool,
    insertOne: insertOne,
    getAll: getAll,
};


// db operations
function intiPool() {
    return new Promise(function(resolve, reject) {
        log.debug('Attempting connection to mongodb on: ' + url);
        MongoClient.connect(url, function(err, db) {
            if (err) {
                log.debug('Error connecting to mongodb');
                reject(err);
            } else {
                conn = db;
                log.debug('Connected to mongodb');
            }
        });
    });
};

function insertOne(collectionName, document) {
    return new Promise(function(resolve, reject) {
        log.info('inserting into: ' + collectionName + conn);
        let collection = conn.collection(collectionName);
        collection.insert(document,
            function(err, result) {
                log.info(result);
                log.info(err);
            });
    });
};


function getAll(collectionName) {
    return new Promise(function(resolve, reject) {
        let collection = conn.collection(collectionName);
        collection.find({}, {_id: 0}).toArray(function(err, docs) {
            if (err) {
                log.debug('Error connecting to mongodb');
                reject(err);
            } else {
                log.debug(docs);
                resolve(docs);
            }
        });
    });
};
