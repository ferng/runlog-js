const config = require('../../config.js');
const log = require('../utils/logger.js').getLogger();
const val = require('../validation/common.js');

var conn;

/**
 * Initialises the database connection pool. Should only be called once, possibly from server.js.
 * @return {Promise}
 * reject when errors occured stablishing connection.
 */
function initPool() {
  return new Promise((resolve, reject) => {
    var dbFile = config.sqlite.file;
    log.debug('Attempting connection to DB to:', dbFile);
      log.debug('Connected to DB', conn);
      resolve();
    });
}


/**
 * Closes a proviously initialized pool
 */
function closePool(){
  conn.close();
}

  
/**
 * Retrieve the specified fields (or all fields if no fields are specified) matching the criteria
 * (or all rows if blank criteria is specified).
 * @param {string} table
 * @param {json} criteria - Json doc specifying fields and matcher values, can be emty document to omit criteria 
 * @param {string[]} [fields = all fields] - Retrieve only specified fields, or all fields if this parameter is omitted
 * @return {Promise}
 * resolve returns retrieved documents.<br>
 * reject on Db connection errors.
 */
function get(table, criteria, fields) {
  return new Promise((resolve, reject) => {
    if (fields === undefined || fields === null || fields.length === 0) {
      fields = '*';
    }

    var statement;
    if (! val.isDocumentValid(criteria)) {
      statement = 'SELECT ' + fields + ' FROM ' + table + ';'
    } else {
      var criteriaColumns = Object.keys(criteria);
      var criteriaValues = Object.values(criteria);
      var criteriaSub = prepPairs(criteriaColumns, criteriaValues);
      statement = 'SELECT ' + fields + ' FROM ' + table + ' WHERE ' + criteriaSub + ';';
    }

    conn.all(statement, (err, docs) => {
      if (err) {
        log.error('Error retrieving rows: ', err);
        reject(err);
        return;
      }
      log.debug('Retrieved rows: ', docs);
      resolve(docs);
    });
  });
}


/**
 * Inserts the given document into the specified database.
 * @param {string} table
 * @param {json} document - Json doc specifying fields and values
 * @return {Promise}
 * resolve returns the rowId of the newly inserted document. Al rowId constraints apply<br>
 * reject on errors: document, sql or connectivity.
 */
function insertOne(table, document) {
  return new Promise((resolve, reject) => {
    if (! val.isDocumentValid(document)) {
      reject(new Error('Invalid document'));
      return;
    }

    var columns = prepStatementFields(Object.keys(document));
    var values = prepStatementFields(Object.values(document));
    var statement = "INSERT INTO " + table + columns + " VALUES" + values;
    conn.run(statement, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(conn.last_insert_rowid);
    });
  });
}


/**
 * Inserts the given document into the specified database.
 * @param {string} table
 * @param {json[]} documents - Array of Json documents specifying fields and values
 * @return {Promise}
 * reject on errors: document, sql or connectivity.
 */
function insertMany(table, documents) {
  return new Promise((resolve, reject) => {
    if (documents === undefined || documents === null || documents.length === 0 || documents.length === undefined) {
        log.error('Invalid document', documents);
        reject(new Error('Invalid document'));
        return;
    }
    documents.forEach((doc) => {
      if (! val.isDocumentValid(doc)) {
        log.error('Invalid document', doc);
        reject(new Error('Invalid document'));
        return;
      }
    });
    var columns = prepStatementFields(Object.keys(documents[0]));
    var data = prepStatementValues(documents);
    var statement = 'INSERT INTO ' + table + columns + ' VALUES' + data;
    conn.run(statement, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}


/**
 * Inserts the given document into the specified database.
 * @param {string} table
 * @param {json} criteria - Json doc specifying fields and matcher values, can be emty document to omit criteria 
 * @param {json} updates - Json doc specifying fields and values
 * @return {Promise}
 * reject on errors: document, sql or connectivity.
 */
function update(table, criteria, updates) {
  return new Promise((resolve, reject) => {
    if (! val.isDocumentValid(criteria)) {
      reject(new Error('Invalid criteria'));
      return;
    }
    if (! val.isDocumentValid(updates)) {
      reject(new Error('Invalid update data'));
      return;
    }

    var criteriaColumns = Object.keys(criteria);
    var criteriaValues = Object.values(criteria);
    var criteriaSub = prepPairs(criteriaColumns, criteriaValues);

    var updateColumns = Object.keys(updates);
    var updateValues = Object.values(updates);
    var updateSub = prepPairs(updateColumns, updateValues);

    var statement = 'UPDATE ' + table + ' SET ' + updateSub + ' WHERE ' + criteriaSub + ';';
  
    conn.run(statement, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}


function execute(statement) {
  return new Promise((resolve, reject) => {
    conn.run(statement, (err) => {
      if (err) {
        log.error('Error executing sql: ', err);
        reject(err);
        return;
      }
      log.debug('Statement executed: ', statement);
      resolve();
    });
  });
}


function prepPairs(columns, values) {
  var paired = ''
  for(var i=0; i<columns.length; i++) {
    paired += columns[i] + "='" + values[i] + "', ";
  }
  paired = paired.slice(0, -2);
  return paired;
}


function prepStatementValues(documents) {
  var values = "";
  documents.forEach(function(document) {
    var parsedDoc = prepStatementFields(Object.values(document));
    values += parsedDoc + ', ';
  });
  values = values.slice(0, -2);
  return values;
}


function prepStatementFields(fields) {
  var fieldList = '(';
  var middle = prepFields(fields)
  fieldList += middle + ')';
  return fieldList;
}


function prepFields(fields) {
  var fieldList = '';

  fields.forEach((field) => {
    fieldList += "'" + field + "', ";
  })

  fieldList = fieldList.slice(0, -2);
  return fieldList;
}


module.exports = {
  initPool: initPool,
  closePool: closePool,
  get: get,
  insertOne: insertOne,
  insertMany: insertMany,
  update: update,
  execute: execute,
};
