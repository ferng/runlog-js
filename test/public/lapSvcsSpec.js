import test from 'tape';
import {areObjectsEqual, areMapsEqual, areArraysEqual} from '../helpers/tools.js';
import {prepDistanceMultiplier, getKeys, prepSelectOpts, calcTimes, splitRows} from '../../public/lapSvcs.jsx';
import {getRefData, getDistanceMults, getUnits, splitRowData} from '../helpers/testData.js';


test('PrepDistanceMultiplier returns a map of units from the loaded referenceData', (t) => {
    const refData = getRefData();
    const multiplierMap = prepDistanceMultiplier(refData);
    t.plan(1);
    t.equal(areMapsEqual(multiplierMap, getDistanceMults()), true);
});


test('GetKeys returns an array with all the keys from a map', (t) => {
    const refData = getRefData();
    const unitMapKeys = prepDistanceMultiplier(refData);
    t.plan(1);
    t.equal(areArraysEqual(getKeys(unitMapKeys), getUnits()), true);
});


test('PrepSelectOpts returns the unit names from loaded referenceData', (t) => {
    const refData = getRefData();
    const unitDataKeys = prepSelectOpts(refData);
    t.plan(1);
    t.equal(areArraysEqual(unitDataKeys, getUnits()), true);
});


test('CalcTimes calculates mph and min per mile', (t) => {
    const tests = [
        {mult: getDistanceMults().get('metre'), dist: 1500, time: '00:05:00', returned: {mph: 11.18, mins: '5:22'}, expected: true},
        {mult: getDistanceMults().get('yard'), dist: 1200, time: '00:05:00', returned: {mph: 8.18, mins: '7:20'}, expected: true},
        {mult: getDistanceMults().get('km'), dist: 13, time: '01:00:00', returned: {mph: 8.08, mins: '7:26'}, expected: true},
        {mult: getDistanceMults().get('mile'), dist: 13, time: '01:32:00', returned: {mph: 8.48, mins: '7:05'}, expected: true},
        {mult: getDistanceMults().get('mile'), dist: 13, time: '00:32:00', returned: {mph: 8.48, mins: '7:05'}, expected: false},
        {mult: getDistanceMults().get('mile'), dist: 0, time: '00:32:00', returned: {mph: 0, mins: '00:00'}, expected: true},
    ];


    t.plan(tests.length);
    for (let test of tests.values()) {
        t.equal(areObjectsEqual(calcTimes(test.mult, test.dist, test.time), test.returned), test.expected);
    }
});


test('SplitRows laps into rows of three and any remainder', (t) => {
    const tests = splitRowData;

    t.plan(29);
    for (let test of tests.values()) {
        const laps = test.data;
        const expected = test.expected;
        const returnedRows = splitRows(laps);
        t.equal(returnedRows.length, expected.length);
        let curLap = 0;
        let curRow = 0;
        returnedRows.map((row) => {
            t.equal(row.length, expected[curRow].length);
            row.map((lap) => {
                t.equal(areObjectsEqual(lap, laps[curLap]), true);
                curLap++;
            });
            curRow++;
        });
    };
});
