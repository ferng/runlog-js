/**
 * General helper tools used while testing, mostly asserting whether complex data types are equal or not.
 * @module test/helpers/tools
 */


/**
 * Compare two objects. The comparison is shallow, not recursive. Only the first level fields are compared.
 * @param {Object} obj1 - 1st object in comparison
 * @param {Object} obj2 - 2nd object in comparison
 * @return {Boolean} true if the two objects match, false otherwise.
 */
function areObjectsEqual(obj1, obj2) {
    let obj1Keys = Object.keys(obj1);
    let obj2Keys = Object.keys(obj2);

    let areEqual = true;
    if (!areArraysEqual(obj1Keys, obj2Keys)) {
        areEqual = false;
    }
    obj1Keys.forEach((item, index, array) => {
        if (obj1[item] === undefined || obj2[item] === undefined) {
            areEqual = false;
        } if (obj1[item] != obj2[item]) {
            areEqual = false;
        }
    });
    return areEqual;
}


/**
 * Compare the content of two arrays.
 * @param {Array} arr1 - 1st array in comparison
 * @param {Array} arr2  - 2nd array in comparison
 * @return {Boolean} true if if the two arrays match, false otherwise.
 */
function areArraysEqual(arr1, arr2) {
    let areEqual = true;
    const arr1Iter = arr1.values();
    for (let v of arr1Iter) {
        if (!arr2.includes(v)) {
            areEqual = false;
        }
    }
    return areEqual;
}


/**
 * Compare the content of two maps.
 * @param {Map} map1 - 1st map in comparison
 * @param {Map} map2  - 2nd map in comparison
 * @return {Boolean} true if the two maps match, false otherwise.
 */
function areMapsEqual(map1, map2) {
    let areEqual = true;
    const map1Iter = map1.keys();
    for (let v of map1Iter) {
        if (!map2.has(v) || map1.get(v) != map2.get(v)) {
            areEqual = false;
        }
    }
    return areEqual;
}


export {
    areObjectsEqual,
    areArraysEqual,
    areMapsEqual,
};
