db = connect('localhost:27017/runlog');

db.select_unit.drop();
db.select_activity.drop();
db.select_kit.drop();
db.select_weather.drop();
db.select_temp.drop();
db.select_effort.drop();
