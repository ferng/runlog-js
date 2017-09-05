/**
 * Db connection and query utilities.
 * Database connectivity details are specified in config.js:
 * @module fernJs/dbConnection
 *
 * @example
 * // database configuration in config.js:
 * config.mongo = {};
 * config.mongo.host = '127.0.0.1';
 * config.mongo.port = 27017;
 * config.mongo.database = 'runlog';
 */

const MongoClient = require('mongodb').MongoClient;
const config = require('../config.js');
const log = require('./logger.js').getLogger();

let conn = undefined;
const url = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database;


/**
 * Initialises the database connection pool. Should only be called once, possibly from server.js.
 * @return {Promise}
 * Resolve on success with with no data.<br>
 * Reject on Db connection errors.
 * @todo check conn if it's already set and reject if so
 */
function initPool() {
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


/**
 * Runs a query on collection retrieving specified fields from all documents.
 * @param {string} collectionName
 * @param {string[]} [fields = all fields] - retrieve only specified fields or all fields if none given
 * @return {Promise}
 * Resolve on success with any retrieved documents.<br>
 * Reject on Db connection errors.
 */
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


/**
 * Inserts a document into a collection if it doesn't exist, or updates an existing one if it already does.
 * @param {string} collectionName
 * @param {object} document - document to be added to collection
 * @return {Promise}
 * Resolve on success with with no data.<br>
 * Reject on Db connection errors, document could not be inserted, client should retry or abend transaction.
 */
function insertOne(collectionName, document) {
    return new Promise((resolve, reject) => {
        let collection = conn.collection(collectionName);
        collection.update({id: document.id}, document, {upsert: true}, (err, result) => {
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


/**
 * Helper to prevent _id field from being returned by a query.
 * @private
 * @param {string[]} fields to be returned
 * @return {object} An object listing which fields to return / avoid.
 */
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


module.exports = {
    initPool: initPool,
    insertOne: insertOne,
    get: get,
};
