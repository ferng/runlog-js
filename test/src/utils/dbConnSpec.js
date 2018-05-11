const test = require('tape');
const db = require('../../../src/utils/dbConn.js');
const config = require('../../../config.js');


test('Open db failure', async (t) => {
  t.plan(1);

  try {
    config.sqlite.file = undefined; 
    await db.initPool();
    t.fail();
  } catch (actual) {
      t.true(actual instanceof TypeError);
  }
});


test('Open db success', async (t) => {
  t.plan(1);
 
  try {
    config.sqlite.file = ':memory:'; 
    await db.initPool();
    t.pass();
  } catch (err) {
    t.fail(err);
  }
});


test('Invalid SQL command', async (t) => {
  t.plan(2);
  try {
    await db.execute('CRXEATE TABLE unit1 (unit_id INTEGER PRIMARY KEY, desc TEXT NOT NULL, conversion REAL NOT NULL)');
    t.fail();
  } catch (actual) {
      t.equal(actual.name, 'Error');
      t.equal(actual.message, 'SQLITE_ERROR: near "CRXEATE": syntax error');
  }
})


test('Create and drop table', async (t) => {
  t.plan(1);
  try {
    await db.execute('CREATE TABLE unit2 (unit_id INTEGER PRIMARY KEY, desc TEXT NOT NULL, conversion REAL NOT NULL)');
    await db.execute('DROP TABLE unit2');
    t.pass()
  } catch (err) {
    t.fail(err);
  }
})


test('get on empty', async (t) => {
  t.plan(2);
  try {
    await db.get('unit3', {});
    t.fail();
  } catch (actual) {
    t.equal(actual.name, 'Error');
    t.equal(actual.message, 'SQLITE_ERROR: no such table: unit3');
  }
})


test('InsertOne and get', async (t) => {
  t.plan(1);
  try {
    await db.execute('CREATE TABLE unit3 (desc TEXT NOT NULL)');
    await db.insertOne('unit3', {'desc': 'hello'});
    const actual = await db.get('unit3', {});
    t.equal(actual[0].desc, 'hello');
    await db.execute('DROP TABLE unit3');
  } catch (err) {
    t.fail(err);
  }
})


test('InsertOne document errors', async (t) => {
  const tests = [
    {doc: undefined, expected: true},
    {doc: null, expected: true},
    {doc: {}, expected: true}
  ]
  
  t.plan(tests.length * 2);
  for (let test of tests.values()) {
    try {
    await db.insertOne('table', test.doc);
    t.fail();
  } catch (actual) {
      t.equal(actual.name === 'Error', test.expected);
      t.equal(actual.message === 'Invalid document', test.expected);
    }
  }
})


test('InsertMany and get', async (t) => {
  t.plan(2);
  try {
    await db.execute('CREATE TABLE unit4 (desc TEXT NOT NULL)');
    await db.insertMany('unit4', [{'desc': 'well'}, {'desc': 'now'}]);

    const actual = await db.get('unit4', {});
    t.equal(actual[0].desc, 'well');
    t.equal(actual[1].desc, 'now');

    await db.execute('DROP TABLE unit4');
  } catch(err) {
    t.fail(err);
  }
})


test('InsertMany document errors', async (t) => {
  const tests = [
    {doc: [undefined], expected: true},
    {doc: [null], expected: true},
    {doc: [{}], expected: true},
    {doc: [], expected: true},
    {doc: 7, expected: true},
    {doc: undefined, expected: true},
    {doc: null, expected: true},
    {doc: {}, expected: true}
  ]
  
  t.plan(tests.length * 2);
  for (let test of tests.values()) {
    try {
      await db.insertMany('table', test.doc)
      t.fail();
    } catch (actual) {
      t.equal(actual.name === 'Error', test.expected);
      t.equal(actual.message === 'Invalid document', test.expected);
    }
  }
})


test('Get Multiple fields', async (t) => {
  t.plan(3);
  const testRecords = [
      {'desc': 'well', 'conversion': 3, 'fruit': 'apples'},
      {'desc': 'now', 'conversion': 1.5, 'fruit': 'pears'},
      {'desc': 'later', 'conversion': 2, 'fruit': 'mangos'},
    ];
  try {
    await db.execute('CREATE TABLE unit5 (desc TEXT NOT NULL, conversion REAL NOT NULL, fruit TEXT NOT NULL)');
    await db.insertMany('unit5', testRecords);
    
    var actual = await db.get('unit5', {});
    t.equal(actual.length, 3);
    
    actual = await db.get('unit5', {}, ['fruit', 'conversion']);
    t.equal(actual.length, 3);
    
    await db.execute('DROP TABLE unit5');
    t.pass();
  } catch(err) {
    t.fail(err);
  }
})


test('Update one record', async (t) => {
  t.plan(10);
  const testRecords = [
      {'desc': 'well', 'conversion': 3, 'fruit': 'apples'},
      {'desc': 'now', 'conversion': 1.5, 'fruit': 'pears'},
      {'desc': 'later', 'conversion': 2, 'fruit': 'mangos'},
    ];
  try {
    await db.execute('CREATE TABLE unit6 (desc TEXT NOT NULL, conversion REAL NOT NULL, fruit TEXT NOT NULL)');
    await db.insertMany('unit6', testRecords);
    
    var actual = await db.get('unit6', {});
    t.equal(actual.length, 3);
    
    actual = await db.get('unit6', {}, ['fruit']);
    t.equal(actual.length, 3);
    var expected = ['apples', 'pears', 'mangos'];
    actual.forEach((actFruit) => {
      if (expected.includes(actFruit.fruit)) {
        t.pass();
      }
    });
  
    const criteria = {'desc': 'now'};
    const update = {'fruit': 'onions'};
    actual = await db.update('unit6', criteria, update);

    actual = await db.get('unit6', {}, ['fruit']);
    t.equal(actual.length, 3);
    expected = ['apples', 'onions', 'mangos'];
    actual.forEach((actFruit) => {
      if (expected.includes(actFruit.fruit)) {
        t.pass();
      }
    });
  
    await db.execute('DROP TABLE unit6');
    t.pass();
  } catch(err) {
    t.fail(err);
  }
})


test('Update multiple records', async (t) => {
  t.plan(10);
  const testRecords = [
      {'desc': 'well', 'conversion': 3, 'fruit': 'apples'},
      {'desc': 'now', 'conversion': 1.5, 'fruit': 'pears'},
      {'desc': 'now', 'conversion': 2, 'fruit': 'mangos'},
    ];
  try {
    await db.execute('CREATE TABLE unit6 (desc TEXT NOT NULL, conversion REAL NOT NULL, fruit TEXT NOT NULL)');
    await db.insertMany('unit6', testRecords);
    
    var actual = await db.get('unit6', {});
    t.equal(actual.length, 3);
    
    actual = await db.get('unit6', {}, ['fruit']);
    t.equal(actual.length, 3);
    var expected = ['apples', 'pears', 'mangos'];
    actual.forEach((actFruit) => {
      if (expected.includes(actFruit.fruit)) {
        t.pass();
      }
    });
  
    const criteria = {'desc': 'now'};
    const update = {'fruit': 'onions'};
    actual = await db.update('unit6', criteria, update);

    actual = await db.get('unit6', {}, ['fruit']);
    t.equal(actual.length, 3);
 
    t.equal(Object.values(actual).length, 3);
    actual.forEach((actFruit) => {
      if (actFruit.fruit === 'onions') {
        t.pass();
      }
    });

    await db.execute('DROP TABLE unit6');
    t.pass();
  } catch(err) {
    t.fail(err);
  }
})


test('Get with criteria', async (t) => {
  t.plan(7);
  const testRecords = [
      {'desc': 'well', 'conversion': 3, 'fruit': 'apples'},
      {'desc': 'now', 'conversion': 1.5, 'fruit': 'pears'},
      {'desc': 'now', 'conversion': 2, 'fruit': 'mangos'},
    ];
  try {
    await db.execute('CREATE TABLE unit6 (desc TEXT NOT NULL, conversion REAL NOT NULL, fruit TEXT NOT NULL)');
    await db.insertMany('unit6', testRecords);
    
    var actual = await db.get('unit6', {});
    t.equal(actual.length, 3);
    
    const criteria = {'desc': 'now'};
    actual = await db.get('unit6', criteria);

    t.equal(actual.length, 2);
    var expected = ['pears', 'mangos'];
    actual.forEach((actFruit) => {
      if (expected.includes(actFruit.fruit)) {
        t.pass();
      }
      if (Object.keys(actFruit).length === 3) {
        t.pass();
      }
    });
  
    await db.execute('DROP TABLE unit6');
    t.pass();
  } catch(err) {
    t.fail(err);
  }
})


test('Get some fields with criteria', async (t) => {
  t.plan(7);
  const testRecords = [
      {'desc': 'well', 'conversion': 3, 'fruit': 'apples'},
      {'desc': 'now', 'conversion': 1.5, 'fruit': 'pears'},
      {'desc': 'now', 'conversion': 2, 'fruit': 'mangos'},
    ];
  try {
    await db.execute('CREATE TABLE unit6 (desc TEXT NOT NULL, conversion REAL NOT NULL, fruit TEXT NOT NULL)');
    await db.insertMany('unit6', testRecords);
    
    var actual = await db.get('unit6', {}, ['conversion']);
    t.equal(actual.length, 3);
    
    const criteria = {'desc': 'now'};
    actual = await db.get('unit6', criteria, ['conversion']);

    t.equal(actual.length, 2);
    var expected = [1.5, 2];
    actual.forEach((act) => {
      if (expected.includes(act.conversion)) {
        t.pass();
      }
      if (Object.keys(act).length === 1) {
        t.pass();
      }
    });
  
    await db.execute('DROP TABLE unit6');
    t.pass();
  } catch(err) {
    t.fail(err);
  }
})
