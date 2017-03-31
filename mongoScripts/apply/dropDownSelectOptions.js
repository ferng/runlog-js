db = connect('localhost:27017/runlog');

bulk = db.select_unit.initializeUnorderedBulkOp();
bulk.insert({desc: 'metre', conversion: 0.000621371});
bulk.insert({desc: 'yard', conversion: 0.000568182});
bulk.insert({desc: 'km', conversion: 0.621371});
bulk.insert({desc: 'mile', conversion: 1});
bulk.execute();

bulk = db.select_activity.initializeUnorderedBulkOp();
bulk.insert({desc: 'fartlek'});
bulk.insert({desc: 'off road'});
bulk.insert({desc: 'track'});
bulk.insert({desc: 'commute'});
bulk.insert({desc: 'day out'});
bulk.execute();

bulk = db.select_kit.initializeUnorderedBulkOp();
bulk.insert({desc: 'everyday'});
bulk.insert({desc: 'fast'});
bulk.insert({desc: 'off road'});
bulk.insert({desc: 'bluey'});
bulk.insert({desc: 'trek'});
bulk.execute();

bulk = db.select_weather.initializeUnorderedBulkOp();
bulk.insert({desc: 'rainy'});
bulk.insert({desc: 'humid'});
bulk.insert({desc: 'dry'});
bulk.insert({desc: 'bright'});
bulk.execute();

bulk = db.select_temp.initializeUnorderedBulkOp();
bulk.insert({desc: 'freezing'});
bulk.insert({desc: 'cold'});
bulk.insert({desc: 'muggy'});
bulk.insert({desc: 'hot'});
bulk.execute();

bulk = db.select_effort.initializeUnorderedBulkOp();
bulk.insert({desc: 'easy'});
bulk.insert({desc: 'ok'});
bulk.insert({desc: 'hard'});
bulk.execute();
