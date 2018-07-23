import test from 'tape';
import { areObjectsEqual } from '../helpers/tools';
import { lapsToReactRows, createLap, lapArrayToMap, calcTimes, getKeys, getValues } from '../../public/lapTools';
import { getDistanceMults, splitRowData, getRandomLap } from '../helpers/testData';


test('lapsToReactRows splits an array of laps into rows of three and any remainder of React components ', (t) => {
  const tests = splitRowData;

  t.plan(29);
  Object.values(tests).forEach((testCase) => {
    const testLaps = testCase.data;
    const { expected } = testCase;
    const returnedRows = lapsToReactRows(testLaps);
    t.equal(returnedRows.length, expected.length);

    let curLap = 0;
    let curRow = 0;
    returnedRows.forEach((row) => {
      const rowData = row.props.data;
      t.equal(rowData.length, expected[curRow].length);

      rowData.forEach((lap) => {
        t.equal(areObjectsEqual(lap.props.lap, testLaps[curLap]), true);
        curLap++;
      });
      curRow++;
    });
  });
});


test('createLap generates a new lap ready for data entry', (t) => {
  const cleanLap = createLap();
  const lap = {
    id: 0, time: '00:00:00', distance: 0, unit: '--',
  };
  t.plan(1);
  t.equal(areObjectsEqual(cleanLap, lap), true);
});


test('createLap generates a well lap with the data we give it', (t) => {
  const lap = getRandomLap();
  const createdLap = createLap(lap.id, lap.time, lap.distance, lap.unit);
  t.plan(1);
  t.equal(areObjectsEqual(createdLap, lap), true);
});


test('lapArrayToMap returns a map produced from the laps in the given array, key is lap_id, value is the lap itself', (t) => {
  const lap1 = getRandomLap();
  const lap2 = getRandomLap();
  const lap3 = getRandomLap();
  const laps = [lap1, lap2, lap3];

  const lapMap = lapArrayToMap(laps);
  const ids = getKeys(lapMap);

  t.plan(4);
  t.equal(ids.length, laps.length);
  ids.forEach((id, index) => {
    t.equal(areObjectsEqual(lapMap.get(id), laps[index]), true);
  });
});


test('calcTimes calculates mph and min per mile', (t) => {
  const tests = [
    {
      mult: getDistanceMults().get('metre'), dist: 1500, time: '00:05:00', returned: { mph: 11.18, mins: '5:22' }, expected: true,
    },
    {
      mult: getDistanceMults().get('yard'), dist: 1200, time: '00:05:00', returned: { mph: 8.18, mins: '7:20' }, expected: true,
    },
    {
      mult: getDistanceMults().get('km'), dist: 13, time: '01:00:00', returned: { mph: 8.08, mins: '7:26' }, expected: true,
    },
    {
      mult: getDistanceMults().get('mile'), dist: 13, time: '01:32:00', returned: { mph: 8.48, mins: '7:05' }, expected: true,
    },
    {
      mult: getDistanceMults().get('mile'), dist: 13, time: '00:32:00', returned: { mph: 8.48, mins: '7:05' }, expected: false,
    },
    {
      mult: getDistanceMults().get('mile'), dist: 1, time: '14:00:00', returned: { mph: 0.07, mins: '857:09' }, expected: true,
    },
    {
      mult: 0, dist: 13, time: '00:32:00', returned: { mph: 0, mins: '00:00' }, expected: true,
    },
    {
      mult: undefined, dist: 13, time: '00:32:00', returned: { mph: 0, mins: '00:00' }, expected: true,
    },
    {
      mult: NaN, dist: 13, time: '00:32:00', returned: { mph: 0, mins: '00:00' }, expected: true,
    },
    {
      mult: 'crap', dist: 13, time: '00:32:00', returned: { mph: 0, mins: '00:00' }, expected: true,
    },
    {
      mult: getDistanceMults().get('mile'), dist: 0, time: '00:32:00', returned: { mph: 0, mins: '00:00' }, expected: true,
    },
    {
      mult: getDistanceMults().get('mile'), dist: undefined, time: '00:32:00', returned: { mph: 0, mins: '00:00' }, expected: true,
    },
    {
      mult: getDistanceMults().get('mile'), dist: NaN, time: '00:32:00', returned: { mph: 0, mins: '00:00' }, expected: true,
    },
    {
      mult: getDistanceMults().get('mile'), dist: 'crap', time: '00:32:00', returned: { mph: 0, mins: '00:00' }, expected: true,
    },
  ];

  t.plan(tests.length);
  Object.values(tests).forEach((testCase) => {
    t.equal(areObjectsEqual(calcTimes(testCase.mult, testCase.dist, testCase.time), testCase.returned), testCase.expected);
  });
});


test('getKeys returns an array with all the keys from a map, getValues does the same but for the values in a map', (t) => {
  const dataMap = new Map();
  dataMap.set('a', 1);
  dataMap.set('b', 17);
  dataMap.set('f', 265);
  dataMap.set('onions', 88);

  const keys = getKeys(dataMap);
  const vals = getValues(dataMap);

  t.plan(6);
  t.equal(keys.length, dataMap.size);
  t.equal(vals.length, dataMap.size);
  for (let i = 0; i < 4; i++) {
    t.equal(dataMap.get(keys[i]), vals[i]);
  }
});
