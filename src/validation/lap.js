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
        if (!isValidDistance(distance) ||
            !isValidTime24(time)) {
            reject('bad');
        }
        let payload = {
            id: id,
            unit: unit,
            distance: distance,
            time: time,
        };
        resolve(payload);
    });
}

function isValidDistance(dist) {
    return (typeof (dist) != 'undefined' &&
        isFloatExpr(dist) &&
        dist > 0);
}

function isValidTime24(time) {
    return (typeof (time) != 'undefined' &&
        isTimeExpr24(time));
}


function isFloatExpr(value) {
    return (/^(\-|\+)?([0-9]+(\.[0-9]+)?)$/.test(value));
}


function isTimeExpr24(value) {
    return isTimeExpr(value, 24);
}


function isTimeExpr(value, maxhour) {
    if (!(/^([\d]{2}:)+([\d]{2})$/.test(value))) {
        return false;
    }

    let hh = Number.parseInt(value.substr(0, 2));
    let mm = Number.parseInt(value.substr(3, 2));
    let ss = Number.parseInt(value.substr(6, 2));

    if ((hh < 0 || hh > maxhour) ||
        (mm < 0 || hh > 59) ||
        (ss < 0 || hh > 59)
        ) {
            return false;
        }

    return true;
}
