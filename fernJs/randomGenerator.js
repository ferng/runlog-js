/**
 * Generates random data..
 * @module fernJs/randomGenerator
 */


/**
 * Generate a random time stamp in 24hr format.
 * @return {string} String representation of the timestamp.
 */
function getRandomTime() {
    let hh = getRandomNumberInclusive(0, 23);
    let mm = getRandomNumberInclusive(0, 59);
    let ss = getRandomNumberInclusive(0, 59);

    return (hh < 10 ? '0' + hh : hh) + ':' +
        (mm < 10 ? '0' + mm : mm) + ':' +
        (ss < 10 ? '0' + ss : ss);
}


/**
 * Generate a positive random number up to and including max.
 * @param {Number} min - range floor
 * @param {string} max - range ceiling
 * @return {Number} The generated random number or undefined if min is negative or larger than max or either value is undefined or NaN.
 */
function getRandomNumberInclusive(min, max) {
    if (min < 0 || min > max || min === undefined || isNaN(min) || max === undefined || isNaN(max)) {
        return undefined;
    }
    return Math.floor(Math.random() * (1 + max - min)) + min;
}


/**
 * Generate a random alphabetical string in lower case
 * @param {Number} len - how long do you want it
 * @return {string} The generated string or undefined if len is negative, undefined or NaN.
 */
function getRandomAlphaString(len) {
    return getRandomString(len, 97, 26);
}


/**
 * Generate a random string of the given length.
 * @param {Number} len - how long do you want it
 * @param {Number} asciiStart - ASCII code for the first character in the range to use
 * @param {Number} rangeLen - size of character set
 * @return {string} The generated string, or undefined if any value is negative, undefined or NaN.
 *
 * @example
 * // 10 character string made up of upper case characters.
 * getRandomString(10, 65, 26)
 *
 * // 10 character string made up of lower case characters.
 * getRandomString(10, 97, 26)
 */
function getRandomString(len, asciiStart, rangeLen) {
    if (len < 0 || len === undefined || isNaN(len) ||
        asciiStart < 0 || asciiStart === undefined || isNaN(asciiStart) ||
        rangeLen < 0 || rangeLen === undefined || isNaN(rangeLen)) {
        return undefined;
    }
    let rndStr = '';
    let offset;

    for (let i = 0; i < len; i++) {
        offset = (Math.random() * 100) % rangeLen;
        rndStr += String.fromCharCode(asciiStart + offset);
    }

    return rndStr;
}


export {
    getRandomTime,
    getRandomNumberInclusive,
    getRandomAlphaString,
    getRandomString,
};
