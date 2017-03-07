const test = require('tape');
const target = require('../../src/validation/lap.js');

test('parseRequestGood', (t) => {
    let expected = {
        id: 12,
        unit: 'meters',
        distance: 15.23,
        time: '12:21:43',
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


test('parseRequestBad', (t) => {
    let reqBody = {
        id: 12,
        unit: 'meters',
        distance: -15.23,
        time: '12:21:43',
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


test('parseDataDistanceBad', (t) => {
    let expectedBad = 'bad';

    t.plan(10);

    target.parseData(12, 'meters', undefined, '12:42:23')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meters', NaN, '12:42:23')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meters', '', '12:42:23')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meters', ' ', '12:42:23')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meters', null, '12:42:23')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meters', 0, '12:42:23')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meters', -1, '12:42:23')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meters', '2.9.2', '12:42:23')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meters', '2.9.x', '12:42:23')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });

    target.parseData(12, 'meters', '2.x', '12:42:23')
        .catch((actual) => {
            t.equal(expectedBad, actual);
        });
});


test('parseDataDistanceInteger', (t) => {
    let expected = {
        id: 12,
        unit: 'meters',
        distance: 15,
        time: '12:21:43',
    };

    t.plan(1);

    target.parseData(12, 'meters', 15, '12:21:43')
        .then((actual) => {
            t.equal(JSON.stringify(expected), JSON.stringify(actual));
        });
});


test('parseDataDistanceFloat', (t) => {
    let expected = {
        id: 12,
        unit: 'meters',
        distance: 15.75,
        time: '12:21:43',
    };

    t.plan(1);

    target.parseData(12, 'meters', 15.75, '12:21:43')
        .then((actual) => {
            t.equal(JSON.stringify(expected), JSON.stringify(actual));
        });
});


test('parseDataDistanceIntegerAsString', (t) => {
    let expected = {
        id: 12,
        unit: 'meters',
        distance: '15',
        time: '12:21:43',
    };

    t.plan(1);

    target.parseData(12, 'meters', '15', '12:21:43')
            .then((actual) => {
            t.equal(JSON.stringify(expected), JSON.stringify(actual));
        });
});


test('parseDataDistanceFloatAsString', (t) => {
    let expected = {
        id: 12,
        unit: 'meters',
        distance: '15.75',
        time: '12:21:43',
    };

    t.plan(1);

    target.parseData(12, 'meters', '15.75', '12:21:43')
        .then((actual) => {
            t.equal(JSON.stringify(expected), JSON.stringify(actual));
        });
});
