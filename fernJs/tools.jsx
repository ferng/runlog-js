/**
 * Provides common services used for lap data entry and rendering.
 * @module common/tools
 */


/**
 * Parses a map and creates an array of its keys.
 * @param {Object.<String, Float>} map - A map
 * @return {string[]} An array containing the keys in the map.
 */
const getKeys = (map) => {
    return Array.from(map.keys());
};


/**
 * Parses a map and creates an array of its values.
 * @param {Object.<String, Float>} map - A map
 * @return {Object[]} An array containing the values in the map.
 */
const getValues = (map) => {
    return Array.from(map.values());
};


/**
 * Compare two objects. The comparison is shallow, not recursive.
 * @param  {object} obj1 - 1st object in comparison
 * @param  {object} obj2 - 2nd object in comparison
 * @return {Boolean} true if the two objects match, false otherwise.
 */
function areObjectsEqual(obj1, obj2) {
    if ((typeof obj1 == 'object' && obj1 != null) && (typeof obj2 == 'object' && obj2 != null)) {
        console.log('top', obj1, obj2);
        if (Object.keys(obj1).length != Object.keys(obj2).length) {
            return false;
        }
        for (let key in obj1) {
            if ((!(key in obj2)) || (!areObjectsEqual(obj1[key], obj2[key]))) {
                return false;
            }
        }
        return true;
    } else {
        console.log('here', obj1, obj2);
        return obj1 === obj2;
    }
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
    getKeys,
    getValues,
    areObjectsEqual,
    areArraysEqual,
    areMapsEqual,
};
