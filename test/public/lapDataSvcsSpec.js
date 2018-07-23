import test from 'tape';
import { areMapsEqual, areArraysEqual } from '../helpers/tools';
import { prepDistanceMultiplier, prepSelectOpts } from '../../public/lapDataSvcs';
import { getRefData, getDistanceMults, getUnits } from '../helpers/testData';


test('prepDistanceMultiplier returns a map of units from the loaded referenceData', (t) => {
  const refData = getRefData();
  const multiplierMap = prepDistanceMultiplier(refData);
  t.plan(1);
  t.equal(areMapsEqual(multiplierMap, getDistanceMults()), true);
});


test('prepSelectOpts returns the unit names from loaded referenceData', (t) => {
  const refData = getRefData();
  const unitDataKeys = prepSelectOpts(refData, 'unit');
  t.plan(1);
  t.equal(areArraysEqual(unitDataKeys, getUnits()), true);
});

