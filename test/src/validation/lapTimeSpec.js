const test = require('tape');
const target = require('../../../src/validation/lap.js');

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
            t.equal(JSON.stringify(expected), JSON.stringify(actual));
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
            t.equal('bad', actual);
        });
});


test('Invalid time data', (t) => {
    let expectedBad = 'bad';

    t.plan(8);

    target.parseData(12, 'meter', 15.23, undefined)
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meter', 15.23, NaN)
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meter', 15.23, null)
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meter', 15.23, '')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meter', 15.23, ' ')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meter', 15.23, '24:42:23')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meter', 15.23, '12:60:23')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meter', 15.23, '12:42:60')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });
});

