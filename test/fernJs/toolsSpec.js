import test from 'tape';
import {getKeys, getValues, areObjectsEqual} from '../../fernJs/tools.jsx';

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

test('areObjectsEqual returns true if objects properties match false otherwise (deep equal as opposed to strict equal although that would also return true)', (t) => {
    const obj1a = {'onions': 56, 'garlic': 76};
    const obj1b = {'garlic': 76, 'onions': 56};
    const obj2a = {'soup': {'broccoli': 55, 'stilton': 12}, 'sandwich': {'cheese': 'cheddar', 'pickle': 'branston'}};
    const obj2b = {'sandwich': {'pickle': 'branston', 'cheese': 'cheddar'}, 'soup': {'stilton': 12, 'broccoli': 55}};
    const obj3a = {'crisps': 87};
    const obj3b = {'crisps': 'ready salted'};
    const obj4a = {'jelly': 44};
    const obj4b = {'ice cream': 44};
    const obj5a = {'one': {'a': 1, 'b': 2, 'c': 3}, 'two': {'e': 4, 'f': 5}};
    const obj5b = {'one': {'a': 1, 'b': 2, 'c': 3}, 'two': {'e': 4, 'f': 5, 'g': 6}};
    const obj6a = {'one': {'a': 1, 'b': 2, 'c': 3}, 'two': {'e': 4, 'f': 5, 'g': 6}};
    const obj6b = {'one': {'a': 1, 'b': 2, 'c': 3}, 'two': {'e': 4, 'f': 5}};


    // t.plan(5);
    t.ok(areObjectsEqual(obj1a, obj1b));
    t.ok(areObjectsEqual(obj2a, obj2b));
    t.notOk(areObjectsEqual(obj3a, obj3b));
    t.notOk(areObjectsEqual(obj4a, obj4b));
    t.notOk(areObjectsEqual(obj5a, obj5b));
    t.notOk(areObjectsEqual(obj6a, obj6b));
    t.end();
});
