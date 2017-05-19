/**
 * Generates test data for unit tests. Mostly for specific tests but there are a few functions that generate generic data useful when not testing edge cases.
 * @module test/helpers/testData
 */

import {getRandomTime, getRandomNumberInclusive} from './randomGenerator.js';


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


/**
 * Retrieves reference data as would have been loaded from the DB in a running system.
 * @return {object} Object containing pseudo-loaded reference data.
 */
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


/**
 * Retrieves units generated from reference data and present in the context.
 * @return {array} Object containing units.
 */
function getUnits() {
    return ['metre',
        'yard',
        'km',
        'mile',
    ];
}


/**
 * Retrieves distance multipliers generated from reference data and present in the context.
 * @return {object.<desc, number>} Map containing distance multipliers.
 */
function getDistanceMults() {
    const expected = new Map();
    expected.set('metre', 0.000621371);
    expected.set('yard', 0.000568182);
    expected.set('km', 0.621371);
    expected.set('mile', 1);

    return expected;
}


/**
 * Creates a new lap with the given parameters.
 * @param {string} time - lap time
 * @param {string} dist - lap distance
 * @param {string} unit - distance measurement unit
 * @return {object} Object containing the lap.
 */
const getNewLap = (time, dist, unit) => {
    return {
        id: getRandomNumberInclusive(1, 10000),
        time: time,
        distance: dist,
        unit: unit,
    };
};


/**
 * Creates a new lap with random data.
 * @return {object} Object containing the lap.
 */
const getRandomLap = () => {
    return getNewLap(getRandomTime(), getRandomDist(), getRandomUnit());
};


/**
 * Generate a random distance up to 27 miles - seems alright for a running log.
 * @return {number} distance.
 */
function getRandomDist() {
    return getRandomNumberInclusive(0, 26) +
        (Math.round(Math.random() * 100) / 100);
}


/**
 * Generate a random distance unit.
 * @return {string} The name of a unit.
 */
function getRandomUnit() {
    let unit = getUnits();
    return unit[getRandomNumberInclusive(0, unit.length - 1)];
}


export {
    splitRowData,
    getRefData,
    getNewLap,
    getRandomLap,
    getRandomDist,
    getRandomUnit,
    getUnits,
    getDistanceMults,
};
