const test = require('tape');
const target = require('../../../src/validation/run.js');
const helper = require('../../helpers/tools.js');

const expectedFailName = 'Error';
const expectedFailMsg = 'failed lap validation';

test('Valid distance data in request', (t) => {
  const expected = {
    lap: {
      id: 12,
      time: '12:21:43',
      distance: 15.23,
      unit: 'meter',
    },
  };

  t.plan(1);
  target.validateRequest(expected)
    .then((actual) => {
      t.equal(helper.areObjectsEqual(actual, expected), true);
    });
});


test('Invalid distance data in request', (t) => {
  const reqBody = {
    lap: {
      id: 12,
      time: '12:21:43',
      distance: -15.23,
      unit: 'meter',
    },
  };

  t.plan(2);
  target.validateRequest(reqBody)
    .catch((actual) => {
      t.equal(actual.name, expectedFailName);
      t.equal(actual.message, expectedFailMsg);
    });
});


test('Valid distance data', (t) => {
  const tests = [
    { distance: 15 },
    { distance: 15.75 },
    { distance: '16' },
    { distance: '16.75' },
  ];

  t.plan(tests.length);
  Object.values(tests).forEach(async (testCase) => {
    const expected = {
      lap: {
        id: 12,
        time: '12:21:43',
        distance: testCase.distance,
        unit: 'meter',
      },
    };

    target.validateLap({
      lap: {
        id: 12, time: '12:21:43', distance: testCase.distance, unit: 'meter',
      },
    })
      .then((actual) => {
        t.equal(helper.areObjectsEqual(actual.lap, expected.lap), true);
      });
  });
});


test('Invalid distance data', (t) => {
  const tests = [
    { distance: undefined },
    { distance: NaN },
    { distance: '' },
    { distance: ' ' },
    { distance: null },
    { distance: 0 },
    { distance: -1 },
    { distance: '2.9.2' },
    { distance: '2.9.x' },
    { distance: '2.x' },
  ];

  t.plan(tests.length * 2);
  Object.values(tests).forEach(async (testCase) => {
    target.validateLap({
      lap: {
        id: 12, time: '12:21:43', distance: testCase.distance, unit: 'meter',
      },
    })
      .catch((actual) => {
        t.equal(actual.name, expectedFailName);
        t.equal(actual.message, expectedFailMsg);
      });
  });
});
