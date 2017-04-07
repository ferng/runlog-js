const splitRowData = [
    {
        data:
        [
            {'id': 1491579752637, 'unit': 'yard', 'distance': 11, 'time': '11:11:11'},
            {'id': 1491579776339, 'unit': 'km', 'distance': 1, 'time': '01:01:01'},
            {'id': 1491579956672, 'unit': 'mile', 'distance': 3, 'time': '12:12:12'},
            {'id': 1491580052319, 'unit': 'meter', 'distance': 7, 'time': '01:01:01'},
            {'id': 1491580085185, 'unit': 'mile', 'distance': 7, 'time': '02:02:02'},
            {'id': 1491581700377, 'unit': 'mile', 'distance': 7, 'time': '01:59:59'},
            {'id': 1491907406005, 'unit': 'mile', 'distance': '10', 'time': '01:01:01'},
        ],
        expected: [
            [
                {distance: 11, id: 1491579752637, time: '11:11:11', unit: 'yard'},
                {distance: 1, id: 1491579776339, time: '01:01:01', unit: 'km'},
                {distance: 3, id: 1491579956672, time: '12:12:12', unit: 'mile'},
            ], [
                {distance: 7, id: 1491580052319, time: '01:01:01', unit: 'meter'},
                {distance: 7, id: 1491580085185, time: '02:02:02', unit: 'mile'},
                {distance: 7, id: 1491581700377, time: '01:59:59', unit: 'mile'},
            ], [
                {distance: 10, id: 1491907406005, time: '01:01:01', unit: 'mile'},
            ],
        ],
    },

    {
        data:
        [
            {'id': 1491579752637, 'unit': 'yard', 'distance': 11, 'time': '11:11:11'},
        ],
        expected: [
            [
                {distance: 11, id: 1491579752637, time: '11:11:11', unit: 'yard'},
            ],
        ],
    },

    {
        data:
        [
            {'id': 1491579752637, 'unit': 'yard', 'distance': 11, 'time': '11:11:11'},
            {'id': 1491579776339, 'unit': 'km', 'distance': 1, 'time': '01:01:01'},
            {'id': 1491579956672, 'unit': 'mile', 'distance': 3, 'time': '12:12:12'},
        ],
        expected: [
            [
                {distance: 11, id: 1491579752637, time: '11:11:11', unit: 'yard'},
                {distance: 1, id: 1491579776339, time: '01:01:01', unit: 'km'},
                {distance: 3, id: 1491579956672, time: '12:12:12', unit: 'mile'},
            ],
        ],
    },

    {
        data:
        [
            {'id': 1491579752637, 'unit': 'yard', 'distance': 11, 'time': '11:11:11'},
            {'id': 1491579776339, 'unit': 'km', 'distance': 1, 'time': '01:01:01'},
            {'id': 1491579956672, 'unit': 'mile', 'distance': 3, 'time': '12:12:12'},
            {'id': 1491580052319, 'unit': 'meter', 'distance': 7, 'time': '01:01:01'},
            {'id': 1491580085185, 'unit': 'mile', 'distance': 7, 'time': '02:02:02'},
            {'id': 1491581700377, 'unit': 'mile', 'distance': 7, 'time': '01:59:59'},
        ],
        expected: [
            [
                {distance: 11, id: 1491579752637, time: '11:11:11', unit: 'yard'},
                {distance: 1, id: 1491579776339, time: '01:01:01', unit: 'km'},
                {distance: 3, id: 1491579956672, time: '12:12:12', unit: 'mile'},
            ], [
                {distance: 7, id: 1491580052319, time: '01:01:01', unit: 'meter'},
                {distance: 7, id: 1491580085185, time: '02:02:02', unit: 'mile'},
                {distance: 7, id: 1491581700377, time: '01:59:59', unit: 'mile'},
            ],
        ],
    },

    {
        data: [],
        expected: [],
    },
];

const getRefData = () => {
    return {
        'unit': [
            {'desc': 'metre', 'conversion': 0.000621371},
            {'desc': 'yard', 'conversion': 0.000568182},
            {'desc': 'km', 'conversion': 0.621371},
            {'desc': 'mile', 'conversion': 1},
        ],
        'effort': [
            {'desc': 'easy'},
            {'desc': 'ok'},
            {'desc': 'hard'},
        ],
    };
};


function getUnits() {
    return ['metre',
        'yard',
        'km',
        'mile',
    ];
}


function getDistanceMults() {
    const expected = new Map();
    expected.set('metre', 0.000621371);
    expected.set('yard', 0.000568182);
    expected.set('km', 0.621371);
    expected.set('mile', 1);

    return expected;
}

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
    let unit = getUnits();
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
    splitRowData,
    getRefData,
    getNewLap,
    getRandomLap,
    getRandomTime,
    getRandomDist,
    getRandomUnit,
    getUnits,
    getDistanceMults,
    getRandomNumberInclusive,
    getRandomString,
};
