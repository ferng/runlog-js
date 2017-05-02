const test = require('tape');
const target = require('../../../src/validation/lap.js');
const helper = require('../../helpers/tools.js');

const expectedBad = 'bad';


test('Valid distance data in request', (t) => {
    let expected = {
        id: 12,
        time: '12:21:43',
        distance: 15.23,
        unit: 'meter',
    };

    let req = {
        body: expected,
    };

    t.plan(1);

    target.parseRequest(req)
        .then((actual) => {
            t.equal(helper.areObjectsEqual(actual, expected), true);
        });
});


test('Invalid distance data in request', (t) => {
    let reqBody = {
        id: 12,
        time: '12:21:43',
        distance: -15.23,
        unit: 'meter',
    };

    let req = {
        body: reqBody,
    };

    t.plan(1);

    target.parseRequest(req)
        .catch((actual) => {
            t.equal(actual, expectedBad);
        });
});


test('Valid distance data', (t) => {
    const tests = [
        {distance: 15},
        {distance: 15.75},
        {distance: '15'},
        {distance: '15.75'},
    ];

    t.plan(tests.length);

    for (let test of tests.values()) {
        let expected = {
            id: 12,
            time: '12:21:43',
            distance: test.distance,
            unit: 'meter',
        };

        target.parseData(12, 'meter', test.distance, '12:21:43')
            .then((actual) => {
                t.equal(helper.areObjectsEqual(actual, expected), true);
            });
    };
});


test('Invalid distance data', (t) => {
    const tests = [
        {distance: undefined},
        {distance: NaN},
        {distance: ''},
        {distance: ' '},
        {distance: null},
        {distance: 0},
        {distance: -1},
        {distance: '2.9.2'},
        {distance: '2.9.x'},
        {distance: '2.x'},
    ];

    t.plan(tests.length);

    for (let test of tests.values()) {
        target.parseData(12, 'meter', test.distance, '12:42:23')
            .catch((actual) => {
                t.equal(actual, expectedBad);
            });
    };
});
