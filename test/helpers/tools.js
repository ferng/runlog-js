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
