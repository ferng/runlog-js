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
    return new Promise((resolve, reject) => {
        log.debug('Attempting connection to mongodb on: ' + url);
        MongoClient.connect(url, (err, db) => {
            if (err) {
                log.error('Error connecting to mongodb: ', err);
                reject(err);
            } else {
                conn = db;
                log.debug('Connected to mongodb');
                resolve();
            }
        });
    });
};


function getAll(collectionName) {
    return new Promise((resolve, reject) => {
        let collection = conn.collection(collectionName);
        collection.find({}, {_id: 0}).toArray((err, docs) => {
            if (err) {
                log.error('Error connecting to mongodb: ', err);
                reject(err);
            } else {
                log.debug('Retrieved docs: ', docs);
                resolve(docs);
            }
        });
    });
};


function insertOne(collectionName, document) {
    return new Promise((resolve, reject) => {
        let collection = conn.collection(collectionName);
        collection.insert(document, (err, result) => {
            if (err) {
                log.error('Error connecting to mongodb: ', err);
                reject(err);
            } else {
                log.info('Inserted into: ' + collectionName + ': ', result);
                resolve();
            }
        });
    });
};


