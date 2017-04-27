const test = require('tape');
const target = require('../../../src/validation/lap.js');
const helper = require('../../helpers/tools.js');

const expectedBad = 'bad';


test('Valid time data in request', (t) => {
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
            t.equal(true, helper.areObjectsEqual(actual, expected));
        });
});


test('Invalid time data in request', (t) => {
    let reqBody = {
        id: 12,
        time: '12:69:43',
        distance: 15.23,
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


test('Invalid time data', (t) => {
    const tests = [
        {time: undefined},
        {time: NaN},
        {time: null},
        {time: ''},
        {time: ' '},
        {time: '24:423'},
        {time: '12:60:23'},
        {time: '12:42:60'},
    ];

    t.plan(tests.length);

    for (let test of tests.values()) {
        target.parseData(12, 'meter', 15.23, test.time)
            .catch((actual) => {
                t.equal(actual, expectedBad);
            });
    };
});
