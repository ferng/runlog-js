const common = require('./common.js');

module.exports = {
    parseRequest: parseRequest,
    parseData: parseData,
};


function parseRequest(req) {
    return parseData(req.body.id,
        req.body.unit,
        req.body.distance,
        req.body.time);
};


function parseData(id, unit, distance, time) {
    return new Promise((resolve, reject) => {
        if (isValid(id, unit, distance, time)) {
            let payload = {
                id: id,
                unit: unit,
                distance: distance,
                time: time,
            };
            resolve(payload);
        } else {
            reject('bad');
        }
    });
};


function isValid(id, unit, distance, time) {
    return (isValidDistance(distance) &&
        isValidTime24(time));
};


function isValidDistance(dist) {
    return (typeof(dist) != 'undefined' &&
        common.isFloatExpr(dist) &&
        dist > 0);
};


function isValidTime24(time) {
    return (typeof(time) != 'undefined' &&
        common.isTimeExpr24(time));
};
