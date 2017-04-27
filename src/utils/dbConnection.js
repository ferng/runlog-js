/**
 * Db connection and query utilities. Database connectivity details are specified in config.js.
 * @module utils/dbConnection
 */

const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.js');
const log = require('../../src/utils/logger.js').getLogger();

let conn = undefined;
const url = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database;


/**
 * Initialises the database connection pool. Should only be called once, possibly from server.js
 * @return {Promise}
 * reject when errors occured stablishing connection.
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
 * @param {String} collectionName
 * @param {String[]} [fields = all fields] - Retrieve only specified fields
 * @return {Promise}
 * resolve returns retrieved documents.<br>
 * reject on Db connection errors.
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
 * Inserts a document into a collection.
 * @param {String} collectionName
 * @param {Object} document - Document to be added to collection
 * @return {Promise}
 * reject document not inserted due to Db connection errors.
 */
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


/**
 * Prevents _id field from being returned by a query.
 * @private
 * @param {String[]} fields to be returned
 * @return {Object} listing which fields to return / avoid.
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
