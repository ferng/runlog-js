import test from 'tape';
import {areMapsEqual, areArraysEqual} from '../helpers/tools.js';
import {prepDistanceMultiplier, prepSelectOpts} from '../../public/lapDataSvcs.jsx';
import {getRefData, getDistanceMults, getUnits} from '../helpers/testData.js';


test('prepDistanceMultiplier returns a map of units from the loaded referenceData', (t) => {
    const refData = getRefData();
    const multiplierMap = prepDistanceMultiplier(refData);
    t.plan(1);
    t.equal(areMapsEqual(multiplierMap, getDistanceMults()), true);
});


test('prepSelectOpts returns the unit names from loaded referenceData', (t) => {
    const refData = getRefData();
    const unitDataKeys = prepSelectOpts(refData);
    t.plan(1);
    t.equal(areArraysEqual(unitDataKeys, getUnits()), true);
});

