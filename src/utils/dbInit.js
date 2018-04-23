const db = require('./src/utils/dbConn.js');

var tables = [
  'CREATE TABLE unit (unit_id INTEGER PRIMARY KEY, desc TEXT NOT NULL, conversion REAL NOT NULL)',
  'CREATE TABLE activity (activity_id INTEGER PRIMARY KEY, desc TEXT NOT NULL)',
  'CREATE TABLE kit (kit_id INTEGER PRIMARY KEY, desc TEXT NOT NULL)',
  'CREATE TABLE weather (weather_id INTEGER PRIMARY KEY, desc TEXT NOT NULL)',
  'CREATE TABLE feelslike (feelslike_id INTEGER PRIMARY KEY, desc TEXT NOT NULL)',
  'CREATE TABLE effort (effort_id INTEGER PRIMARY KEY, desc TEXT NOT NULL)'
]

tables.foreach ((statement) => {
  db.execute(statement)
  
})


db.execute('CREATE TABLE unit (
  unit_id INTEGER PRIMARY KEY,
  desc TEXT NOT NULL,
  conversion REAL NOT NULL)')
