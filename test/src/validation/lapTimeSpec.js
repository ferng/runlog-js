const test = require('tape');
const target = require('../../../src/validation/run.js');
const helper = require('../../helpers/tools.js');

const expectedFailName = 'Error';
const expectedFailMsg = 'failed lap validation';


test('Valid time data in request', (t) => {
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
      t.equal(true, helper.areObjectsEqual(actual, expected));
    });
});


test('Invalid time data in request', (t) => {
  const reqBody = {
    lap: {
      id: 12,
      time: '12:69:43',
      distance: 15.23,
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


test('Invalid time data', (t) => {
  const tests = [
    { time: undefined },
    { time: NaN },
    { time: null },
    { time: '' },
    { time: ' ' },
    { time: '24:423' },
    { time: '12:60:23' },
    { time: '12:42:60' },
  ];

  t.plan(tests.length * 2);

  Object.values(tests).forEach(async (testCase) => {
    target.validateLap({
      lap: {
        id: 12, time: testCase.time, distance: 15.23, unit: 'meter',
      },
    })
      .catch((actual) => {
        t.equal(actual.name, expectedFailName);
        t.equal(actual.message, expectedFailMsg);
      });
  });
});
