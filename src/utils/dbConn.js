const sqlite3 = require('sqlite3').verbose();
const config = require('../../config.js');
const log = require('../utils/logger.js').getLogger();
const val = require('../validation/common.js');

var conn;

function initPool() {
  return new Promise((resolve, reject) => {
    var dbFile = config.sqlite.file;
    log.debug('Attempting connection to DB to:', dbFile);
    conn = new sqlite3.cached.Database(dbFile, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
        log.error('Error connecting DB: ', err);
        reject(err);
        return;
      }
      log.debug('Connected to DB', conn);
      resolve();
    });
  });
}


function closePool(){
  conn.close();
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
  execute: execute,
  get: get,
  insertOne: insertOne,
  insertMany: insertMany,
  update: update,
};
