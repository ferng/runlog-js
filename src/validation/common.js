module.exports = {
    isFloatExpr: isFloatExpr,
    isTimeExpr24: isTimeExpr24,
};


function isFloatExpr(value) {
    return (/^(\-|\+)?([0-9]+(\.[0-9]+)?)$/.test(value));
};


function isTimeExpr24(value) {
    return isTimeExpr(value, 24);
};


function isTimeExpr(value, maxhour) {
    if (!(/^([\d]{2}:)+([\d]{2})$/.test(value))) {
        return false;
    };

    let hh = Number.parseInt(value.substr(0, 2));
    let mm = Number.parseInt(value.substr(3, 2));
    let ss = Number.parseInt(value.substr(6, 2));

    return ((hh >= 0 && hh < maxhour) &&
        (mm >= 0 && mm <= 59) &&
        (ss >= 0 && ss <= 59)
    );
};
