const test = require('tape');
const target = require('../../src/validation.js');
const helper = require('../helpers/tools.js');

const expectedBad = 'bad';

test('Valid distance data in request', (t) => {
    let expected = {lap: {
        id: 12,
        time: '12:21:43',
        distance: 15.23,
        unit: 'meter',
    }};

    t.plan(1);
    target.validateRequest(expected)
        .then((actual) => {
            t.equal(helper.areObjectsEqual(actual, expected), true);
        });
});


test('Invalid distance data in request', (t) => {
    let reqBody = {lap: {
        id: 12,
        time: '12:21:43',
        distance: -15.23,
        unit: 'meter',
    }};

    t.plan(1);
    target.validateRequest(reqBody)
        .catch((actual) => {
            t.equal(actual, expectedBad);
        });
});
