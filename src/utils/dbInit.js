const db = require('./src/utils/dbConn.js');
const log = require('../utils/logger.js').getLogger();

var unit = {
  'table': 'unit',
  'create': 'CREATE TABLE unit (id INTEGER PRIMARY KEY, desc TEXT NOT NULL, conversion REAL NOT NULL)',
  'data': [
    {desc: 'metre', conversion: 0.000621371};
    {desc: 'yard', conversion: 0.000568182};
    {desc: 'km', conversion: 0.621371};
    {desc: 'mile', conversion: 1};
  ]
};

var activity = {
  'table': 'activity',
  'create': 'CREATE TABLE activity (id INTEGER PRIMARY KEY, desc TEXT NOT NULL)',
  'data': [
    {desc: 'fartlek'},
    {desc: 'off road'},
    {desc: 'track'},
    {desc: 'commute'},
    {desc: 'day out'},
  ]
};

var kit = {
  'table': 'kit'
  'create': 'CREATE TABLE kit (id INTEGER PRIMARY KEY, desc TEXT NOT NULL)',
  'data': [
    {desc: 'everyday'},
    {desc: 'fast'},
    {desc: 'off road'},
    {desc: 'bluey'},
    {desc: 'trek'},
  ]
};

var weather = {
  'table': 'weather',
  'create': 'CREATE TABLE weather (id INTEGER PRIMARY KEY, desc TEXT NOT NULL)',
  'data': [
    {desc: 'rainy'},
    {desc: 'humid'},
    {desc: 'dry'},
    {desc: 'bright'},
  ]
};

var feelslike = {
  'table': 'feelslike',
  'create': 'CREATE TABLE feelslike (id INTEGER PRIMARY KEY, desc TEXT NOT NULL)',
  'data': [
    {desc: 'freezing'},
    {desc: 'cold'},
    {desc: 'muggy'},
    {desc: 'hot'},
  ]
};

var effort = {
  'table': 'effort',
  'create': 'CREATE TABLE effort (id INTEGER PRIMARY KEY, desc TEXT NOT NULL)'
  'data': [
    {desc: 'easy'},
    {desc: 'ok'},
    {desc: 'hard'},
  ]
};

var definitions = [unit, activity, kit, weather, feelslike, effort];


function init() {
  definitions.foreach ((def) => {
    try {
      await db.execute(def.create);
      await db.insertMany(def.table, def.data);
    } catch(err) {
        log.error('Fatal error during database creation: ', err);
    }
  })
};


module.exports = {
  init: init,
};
