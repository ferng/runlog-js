/**
 * Provides common services used to process retrieved data and to save it.
 * @module public/lapDataSvcs
 */

import { get, post, remove } from './general/ajaxSvcs';

const optionTypes = ['unit', 'activity', 'kit', 'weather', 'feels', 'effort'];


/**
 * Uses an ajax call to retrieve application wide reference data from the backend server.
 * @return {Promise}
 * resolve returns a Map with {@link module:public/types~refData|retrieved data}.<br>
 * reject on connectivity or issues with the server at the endpoint.
 */
const getRefData = () =>
  new Promise((resolve, reject) => {
    get(`/api/svcs/selectOpts/${optionTypes.toString()}`)
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject(new Error('Error loading data, please try later.'));
      });
  });


/**
 * Uses an ajax call to retrieve runlog entry data from the backend server.
 * @return {Promise}
 * @param {string} dataType - Specify the running log data type we are requesting (laps, sessions, etc)
 * resolve returns retrieved data.<br>
 * reject on connectivity or issues with the server at the endpoint.
 */
const getItems = dataType =>
  new Promise((resolve, reject) => {
    get(`/api/runs/${dataType}`)
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject(new Error('Error loading data, please try later.'));
      });
  });


/**
 * Uses an ajax call to retrieve runlog entry data from the backend server.
 * @return {Promise}
 * @param {string} dataType - Specify the running log data type we are requesting (laps, sessions, etc)
 * resolve returns retrieved data.<br>
 * @param {Number} parentId - the id of the parent so we know what children to get
 * reject on connectivity or issues with the server at the endpoint.
 */
const getItemsByParent = (dataType, parentId) =>
  new Promise((resolve, reject) => {
    get(`/api/runs/${dataType}?parentId=${parentId}`)
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject(new Error('Error loading data, please try later.'));
      });
  });


/**
 * Uses an ajax call to send a new item of data to the backend server for storage.
 * @param {body} body - The data we are sending to the server to save
 * @param {string} dataType - Specify the running log data type we are submitting (laps, activities, etc)
 * @return {Promise}
 * reject on connectivity or issues with the server at the endpoint.
 */
const postNewItem = (body, dataType) =>
  new Promise((resolve, reject) => {
    post(`/api/runs/${dataType}`, body)
      .then((response) => {
        resolve(JSON.parse(response));
      })
      .catch((error) => {
        if (error === '504') {
          reject(new Error('Error saving data, please try later.'));
        } else {
          reject(new Error('Application error, please contact us.'));
        }
      });
  });


const removeItem = (dataType, id) =>
  new Promise((resolve, reject) => {
    remove(`/api/runs/${dataType}?id=${id}`)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject(new Error('Error deleting data, please try later.'));
      });
  });

const getRefOpts = (refData, type) =>
  refData.find(ref => ref.optType === type);


/**
 * Parses reference data objects and creates a map of unit names and multipliers to convert to/from miles.
 * @param {object} optionRefData - {@link module:public/types~multipliers|Reference data}
 * @return {object.<string, object>} A map containing unit Names and {@link module:public/types~multipliers|corresponding multipliers} (if any are present).
 */
const prepDistanceMultiplier = (optionRefData) => {
  const multipliers = new Map();
  if (optionRefData !== undefined) {
    const unitOpts = getRefOpts(optionRefData, 'unit');
    unitOpts.options.forEach((unit) => {
      multipliers.set(unit.desc, unit.conversion);
    });
  }
  return multipliers;
};


/**
 * Parses reference data objects and creates an array with the names to use as Select Options.
 * @param {object.<string, Object>} optionRefData - {@link module:public/types~multipliers|Reference data}
 * @param {string} type - The type of Select data the dropdown will display
 * @return {string[]} An array containing the name of the given Select option type.
 */
const prepSelectOpts = (optionRefData, type) => {
  const opts = ['--'];
  if (optionRefData !== undefined) {
    const unit = getRefOpts(optionRefData, type);
    unit.options.forEach((option) => {
      opts.push(option.desc);
    });
  }
  return opts;
};


export {
  getRefData,
  getItems,
  getItemsByParent,
  postNewItem,
  prepDistanceMultiplier,
  prepSelectOpts,
  removeItem,
};
