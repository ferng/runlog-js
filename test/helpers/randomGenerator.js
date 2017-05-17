/**
 * Generates test data for unit tests. These are generic helper methods.
 * @module test/helpers/randomGenerator
 */


/**
 * Generate a random time stamp in 24hr format.
 * @return {string} string representation of the timestamp.
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
 * Generate a random number up to and including max.
 * @param {Number} min - range floor
 * @param {string} max - range ceiling
 * @return {Number} the generated number
 */
function getRandomNumberInclusive(min, max) {
    return Math.floor(Math.random() * (1 + max - min)) + min;
}


/**
 * Generate a random string of the given length.
 * @param {Number} len - how long do you want it
 * @param {Number} asciiStart - ASCII code for the first character in the range to use
 * @param {Number} rangeLen - size of character set
 * @return {string} the generated string.
 *
 * @example
 * // 10 character string made up of upper case characters.
 * getRandomString(10, 65, 26)
 *
 * // 10 character string made up of lower case characters.
 * getRandomString(10, 97, 26)
 *
 * // 3 character string made up of digits.
 * getRandomString(3, 48, 10)
 */
function getRandomString(len, asciiStart, rangeLen) {
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
    getRandomString,
};
