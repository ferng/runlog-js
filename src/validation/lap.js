module.exports = {
    parseRequestLap: parseRequestLap,
    validate: validate,
};

function parseRequestLap(req) {
    return validate(Date.now(),
        req.body.unit,
        parseFloat(req.body.distance, 10),
        req.body.time);
}

function validate(id, unit, distance, time) {
    return new Promise(function(resolve, reject) {
        let payload = {
            id: id,
            unit: unit,
            distance: distance,
            time: time,
        };
        resolve(payload);
    });
}
