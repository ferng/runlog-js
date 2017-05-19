/**
 * Provides common ajax services based on REST actions.
 * @module public/ajaxSvcs
 */


/**
 * Encapsulates an HTTP-GET within a promise.
 * @param {string} endpoint - Where are we getting the data from
 * @return {Promise}
 * resolve returns retrieved data.<br>
 * reject on connectivity or issues with the server at the endpoint.
 */
const get = (endpoint) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
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
};


/**
 * Encapsulates an HTTP-POST within a promise.
 * @param {string} endpoint - Where are we getting the data from
 * @param {object} body - The data we are sending to the server to save
 * @return {Promise}
 * reject on connectivity or issues with the server at the endpoint.
 */
const post = (endpoint, body) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', endpoint);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            if (xhr.status === 201) {
                resolve();
            } else {
                reject(xhr.status);
            };
        };
        xhr.send(JSON.stringify(body));
    });
};


export {
    get,
    post,
};
