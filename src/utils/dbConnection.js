const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.js');
const log = require('../../src/utils/logger.js').getLogger();

let conn = undefined;

const url = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database;

module.exports = {
    initPool: intiPool,
    insertOne: insertOne,
    get: get,
};


// initialise connection pool
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


// get some or all fields from all documents in a collection
function get(collectionName, fields) {
    return new Promise((resolve, reject) => {
        let collection = conn.collection(collectionName);
        let projection = parseProjection(fields);
        collection.find({}, projection).toArray((err, docs) => {
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


// insert a new document into a collection
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


// helpers
function parseProjection(fields) {
    let projection = {};
    projection['_id'] = 0;
    if (fields !== undefined) {
        fields.forEach((item, index, array) => {
            projection[item] = 1;
        });
    }
    return projection;
}
