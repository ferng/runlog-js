/**
 * General validation utilities.
 * @module src/validation/common
 */

/**
 * Checks whether a String looks like a floating number.
 * @param {string} value - String to parse
 * @return {Boolean} TRUE if it does FALSE otherwise.
 */
function isFloatExpr(value) {
  return (/^(-|\+)?([0-9]+(\.[0-9]+)?)$/.test(value));
}


/**
 * Checks whether a String looks like it could be representing a timestamp in 24hr format.
 * @param {string} value - String to parse
 * @return {Boolean} TRUE if it does FALSE otherwise.
 */
function isTimeExpr24(value) {
  return isTimeExpr(value, 24);
}


/**
 * Checks whether a String looks like it could be representing a timestamp.
 * @private
 * @param {string} value - String to parse
 * @param {Number} maxhour - time format: [12|24]
 * @return {Boolean} TRUE if it does FALSE otherwise.
 */
function isTimeExpr(value, maxhour) {
  if (!(/^([\d]{2}:)+([\d]{2})$/.test(value))) {
    return false;
  }

  const hh = Number.parseInt(value.substr(0, 2), 10);
  const mm = Number.parseInt(value.substr(3, 2), 10);
  const ss = Number.parseInt(value.substr(6, 2), 10);

  return ((hh >= 0 && hh < maxhour) &&
        (mm >= 0 && mm <= 59) &&
        (ss >= 0 && ss <= 59)
  );
}

function objEmpty(obj) {
  return obj === undefined ||
    obj === null ||
    Object.keys(obj).length === 0;
}

function isDocumentValid(doc) {
  return !objEmpty(doc);
}


module.exports = {
  isFloatExpr,
  isTimeExpr24,
  objEmpty,
  isDocumentValid,
};
