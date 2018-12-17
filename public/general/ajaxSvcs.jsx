/**
 * Provides common ajax services based on REST actions.
 * @module public/general/ajaxSvcs
 */


/**
 * Encapsulates an HTTP-GET within a promise.
 * @param {string} endpoint - Where are we getting the data from
 * @return {Promise}
 * resolve returns retrieved data.<br>
 * reject on connectivity or issues with the server at the endpoint.
 */
const get = endpoint =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint);
    let msg;
    xhr.onload = () => {
      if (xhr.status === 200) {
        msg = JSON.parse(xhr.responseText);
        resolve(msg);
      } else {
        reject(xhr.status);
      }
    };
    xhr.send();
  });


/**
 * Encapsulates an HTTP-POST within a promise.
 * @param {string} endpoint - Where are we getting the data from
 * @param {object} body - The data we are sending to the server to save
 * @return {Promise}
 * reject on connectivity or issues with the server at the endpoint.
 */
const post = (endpoint, body) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.status === 201) {
        resolve(xhr.response);
      } else {
        reject(xhr.status);
      }
    };
    xhr.send(JSON.stringify(body));
  });


const remove = endpoint =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', endpoint);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve();
      } else {
        reject(xhr.status);
      }
    };
    xhr.send();
  });


export {
  get,
  post,
  remove,
};
