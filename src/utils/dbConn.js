const sqlite3 = require('sqlite3').verbose();
const config = require('../../config.js');
const log = require('../utils/logger.js').getLogger();
const val = require('../validation/common.js');

let conn;

/**
 * Initialises the database connection pool. Should only be called once, possibly from server.js.
 * @return {Promise}
 * reject when errors occured stablishing connection.
 */
function initPool() {
  return new Promise((resolve, reject) => {
    const dbFile = config.sqlite.file;
    log.debug('Attempting connection to DB to:', dbFile);
    conn = new sqlite3.cached.Database(dbFile, sqlite3.OPEN_READWRITE || sqlite3.OPEN_CREATE, (err) => {
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


/**
 * Closes a proviously initialized pool
 */
function closePool() {
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
  let fieldList = fields;
  return new Promise((resolve, reject) => {
    if (fields === undefined || fields === null || fields.length === 0) {
      fieldList = '*';
    }

    let statement;
    if (!val.isDocumentValid(criteria)) {
      statement = `SELECT ${fieldList} FROM ${table};`;
    } else {
      const criteriaColumns = Object.keys(criteria);
      const criteriaValues = Object.values(criteria);
      const criteriaSub = prepCriteriaPairs(criteriaColumns, criteriaValues);
      statement = `SELECT ${fieldList} FROM ${table} WHERE ${criteriaSub};`;
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
/* eslint-disable func-names */ // if we use lambda there is no this object so we don't get the last insert id
function insertOne(table, doc) {
  return new Promise((resolve, reject) => {
    if (!val.isDocumentValid(doc)) {
      log.error('Invalid document', doc);
      reject(new Error('Invalid document'));
      return;
    }
    const columns = Object.keys(doc);
    const values = Object.values(doc);

    const insertColumns = prepStatementFields(columns);
    const insertValues = prepStatementFields(values);
    const updateSub = prepValuePairs(columns, values);
    const statement = `INSERT INTO ${table} ${insertColumns} VALUES ${insertValues} on CONFLICT(id) DO UPDATE SET ${updateSub}`;
    conn.run(statement, function (err) {
      if (err) {
        log.error('Error saving data: ', err);
        reject(err);
        return;
      }
      if (doc.id === undefined) {
        resolve(this.lastID);
      } else {
        resolve(doc.id);
      }
    });
  });
}
/* eslint-enable func-names */


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
      if (!val.isDocumentValid(doc)) {
        log.error('Invalid document', doc);
        reject(new Error('Invalid document'));
        return;
      }
    });
    const columns = prepStatementFields(Object.keys(documents[0]));
    const data = prepStatementValues(documents);
    const statement = `INSERT INTO ${table}${columns} VALUES${data}`;
    conn.run(statement, (err) => {
      if (err) {
        log.error('Error saving data: ', err);
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
    if (!val.isDocumentValid(criteria)) {
      log.error('Invalid criteria', criteria);
      reject(new Error('Invalid criteria'));
      return;
    }
    if (!val.isDocumentValid(updates)) {
      log.error('Invalid update data', updates);
      reject(new Error('Invalid update data'));
      return;
    }

    const criteriaColumns = Object.keys(criteria);
    const criteriaValues = Object.values(criteria);
    const criteriaSub = prepValuePairs(criteriaColumns, criteriaValues);

    const updateColumns = Object.keys(updates);
    const updateValues = Object.values(updates);
    const updateSub = prepValuePairs(updateColumns, updateValues);

    const statement = `UPDATE ${table} SET ${updateSub} WHERE ${criteriaSub};`;

    conn.run(statement, (err) => {
      if (err) {
        log.error('Error saving data: ', err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}


function remove(table, criteria) {
  return new Promise((resolve, reject) => {
    if (!val.isDocumentValid(criteria)) {
      log.error('Invalid criteria', criteria);
      reject(new Error('Invalid criteria'));
      return;
    }

    const criteriaColumns = Object.keys(criteria);
    const criteriaValues = Object.values(criteria);
    const criteriaSub = prepValuePairs(criteriaColumns, criteriaValues);

    const statement = `DELETE FROM ${table} WHERE ${criteriaSub};`;

    conn.run(statement, (err) => {
      if (err) {
        log.error('Error deleting data: ', err);
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


function prepCriteriaPairs(columns, values) {
  let paired = '';
  for (let i = 0; i < columns.length; i++) {
    paired += `${columns[i]}='${values[i]}' AND `;
  }
  paired = paired.slice(0, -5);
  return paired;
}


function prepValuePairs(columns, values) {
  let paired = '';
  for (let i = 0; i < columns.length; i++) {
    paired += `${columns[i]}='${values[i]}', `;
  }
  paired = paired.slice(0, -2);
  return paired;
}


function prepStatementValues(documents) {
  let values = '';
  documents.forEach((document) => {
    const parsedDoc = prepStatementFields(Object.values(document));
    values += `${parsedDoc}, `;
  });
  values = values.slice(0, -2);
  return values;
}


function prepStatementFields(fields) {
  return `(${prepFields(fields)})`;
}


function prepFields(fields) {
  let fieldList = '';
  fields.forEach((field) => {
    if (field === null) {
      fieldList += `${field}, `;
    } else {
      fieldList += `'${field}', `;
    }
  });

  fieldList = fieldList.slice(0, -2);
  return fieldList;
}


module.exports = {
  initPool,
  closePool,
  get,
  insertOne,
  insertMany,
  update,
  execute,
  remove,
};
