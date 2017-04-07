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


test('Invalid distance data', (t) => {
    t.plan(10);

    target.parseData(12, 'meter', undefined, '12:42:23')
        .catch((actual) => {
            t.equal(actual, expectedBad);
        });

    target.parseData(12, 'meter', NaN, '12:42:23')
        .catch((actual) => {
            t.equal(actual, expectedBad);
        });

    target.parseData(12, 'meter', '', '12:42:23')
        .catch((actual) => {
            t.equal(actual, expectedBad);
        });

    target.parseData(12, 'meter', ' ', '12:42:23')
        .catch((actual) => {
            t.equal(actual, expectedBad);
        });

    target.parseData(12, 'meter', null, '12:42:23')
        .catch((actual) => {
            t.equal(actual, expectedBad);
        });

    target.parseData(12, 'meter', 0, '12:42:23')
        .catch((actual) => {
            t.equal(actual, expectedBad);
        });

    target.parseData(12, 'meter', -1, '12:42:23')
        .catch((actual) => {
            t.equal(actual, expectedBad);
        });

    target.parseData(12, 'meter', '2.9.2', '12:42:23')
        .catch((actual) => {
            t.equal(actual, expectedBad);
        });

    target.parseData(12, 'meter', '2.9.x', '12:42:23')
        .catch((actual) => {
            t.equal(actual, expectedBad);
        });

    target.parseData(12, 'meter', '2.x', '12:42:23')
        .catch((actual) => {
            t.equal(actual, expectedBad);
        });
});


test('Valid distance as interger', (t) => {
    let expected = {
        id: 12,
        time: '12:21:43',
        distance: 15,
        unit: 'meter',
    };

    t.plan(1);

    target.parseData(12, 'meter', 15, '12:21:43')
        .then((actual) => {
            t.equal(helper.areObjectsEqual(actual, expected), true);
        });
});


test('Valid diatnce as float', (t) => {
    let expected = {
        id: 12,
        time: '12:21:43',
        distance: 15.75,
        unit: 'meter',
    };

    t.plan(1);

    target.parseData(12, 'meter', 15.75, '12:21:43')
        .then((actual) => {
            t.equal(helper.areObjectsEqual(actual, expected), true);
        });
});


test('Valid distance as integer as string', (t) => {
    let expected = {
        id: 12,
        time: '12:21:43',
        distance: '15',
        unit: 'meter',
    };

    t.plan(1);

    target.parseData(12, 'meter', '15', '12:21:43')
            .then((actual) => {
            t.equal(helper.areObjectsEqual(actual, expected), true);
        });
});


test('Valid distance as float as string', (t) => {
    let expected = {
        id: 12,
        time: '12:21:43',
        distance: '15.75',
        unit: 'meter',
    };

    t.plan(1);

    target.parseData(12, 'meter', '15.75', '12:21:43')
        .then((actual) => {
            t.equal(helper.areObjectsEqual(actual, expected), true);
        });
});
