const get = (endpoint) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', endpoint);
        let msg;
        xhr.onload = function() {
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


const post = (endpoint, body) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', endpoint);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
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
