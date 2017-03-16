

const getNewLap = (timeVal, distVal, unitVal) => {
    return {
        id: getRandomNumberInclusive(1, 10000),
        time: timeVal,
        distance: distVal,
        unit: unitVal,
    };
};


const getRandomLap = () => {
    return getNewLap(getRandomTime(), getRandomDist(), getRandomUnit());
};


function getRandomTime() {
    let hh = getRandomNumberInclusive(0, 23);
    let mm = getRandomNumberInclusive(0, 59);
    let ss = getRandomNumberInclusive(0, 59);

    return (hh < 10 ? '0' + hh : hh) + ':' +
        (mm < 10 ? '0' + mm : mm) + ':' +
        (ss < 10 ? '0' + ss : ss);
}


function getRandomDist() {
    return getRandomNumberInclusive(0, 26) +
        (Math.round(Math.random() * 100) / 100);
}


function getRandomUnit() {
    let unit = ['metre',
        'yard',
        'km',
        'mile',
    ];
    return unit[getRandomNumberInclusive(0, unit.length - 1)];
}


function getRandomNumberInclusive(x, y) {
    return Math.floor(Math.random() * (1 + y - x)) + x;
}


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
    getNewLap,
    getRandomLap,
    getRandomTime,
    getRandomDist,
    getRandomUnit,
    getRandomNumberInclusive,
    getRandomString,
};
