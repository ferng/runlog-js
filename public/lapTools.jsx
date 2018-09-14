/**
 * Provides common services used for lap data entry and rendering.
 * @module public/lapTools
 */

import React from 'react';
import Lap from './Lap';
import LapRow from './LapRow';


/**
 * Rendering utility which converts a data lap into a React Lap for display.
 * @param  {object} lap - The {@link module:public/types~lap|lap} to convert
 * @param {Function} editCallback - callBack function when a lap is clicked for editing
 * @param {Function} submitCallback - callBack function when lap being edited is submitted for saving
 * @return {Lap} A Lap React component.
 * @private
 */
const lapToReact = (lap, editCallback, submitCallback) =>
  React.createElement(Lap, {
    lap, key: lap.id, editLap: lap.editLap, onLapEdit: editCallback, onLapSubmit: submitCallback,
  });


/**
 * Rendering utility which converts an array of Lap arrays into an array of React LapRows for display.
 * @param {Object[]} rows - An array of Lap arrays (one for each row)
 * @return {LapRow[]} An array containing of rows each one containing an array of three laps each.
 * @private
 */
const rowsToReact = rows =>
  rows.map((lapRow, index) =>
    <LapRow data={lapRow} key={index} />);


/**
 * Rendering utility which splits the total number of laps into React rows of three laps each to use on screen.
 * @param {Object[]} laps - An array with all the {@link module:public/types~lap|laps}
 * @param {Function} editCallback - CallBack function when a lap is clicked for editing
 * @param {Function} submitCallback - CallBack function when lap being edited is submitted for saving
 * @return {LapRow[]} An array containing of rows each one containing an array of three laps each.
 */
const lapsToReactRows = (laps, editCallback, submitCallback) => {
  const rows = [];
  let thisRow = [];

  for (let i = 0; i < laps.length; i++) {
    const lap = lapToReact(laps[i], editCallback, submitCallback);
    thisRow.push(lap);
    if ((i + 1) % 3 === 0) {
      rows.push(thisRow);
      thisRow = [];
    }
  }
  if (thisRow.length > 0) {
    rows.push(thisRow);
  }

  return rowsToReact(rows);
};


/**
 * Creates a brand new lap object with the provided data or with blank default data if none is provided.
 * @param {number} id - Lap id
 * @param {string} time - Time taken to complete the lap
 * @param {float} distance - What was the distance convered
 * @param {string} unit - What was the distance unit: mile, metre, etc
 * @return {object} A Lap with the data provided or blanks if none.
 */
const createLap = (id = 0, time = '00:00:00', distance = 0, unit = '--') =>
  ({
    id, time, distance, unit,
  });


/**
 * Creates a brand new activity object with the provided data or with blank default data if none is provided.
 * @param {number} id - Activity id
 * @param {string} activity - The activity the set of Laps will define
 * @param {string} kit - The kit I relied on for this activity
 * @param {string} weather - What was the weather like
 * @param {string} feels - What did the temperature feel like
 * @param {string} effort - And what was the perceived effort
 * @return {object} An Activity with the data provided or blanks if none.
 */
const createSession = (id = 0, activity = '--', kit = '--', weather = '--', feels = '--', effort = '--') =>
  ({
    id, activity, kit, weather, feels, effort,
  });


const cloneData = (source) => {
  const keys = Object.keys(source);
  let dest = {};
  keys.forEach((key) => {
    dest[key] = source[key];
  })
  return dest;
}


/**
 * Converts an array of lap data into a Map for quicker lap access
 * @param {object[]} laps - An array of {@link module:public/types~lap|laps}
 * @return {object.<number, object>} A map of all laps with key=lap.id, value=lap.
 */
const lapArrayToMap = (laps) => {
  const lapMap = new Map();
  laps.forEach((lap) => {
    lapMap.set(lap.id, lap);
  });
  return lapMap;
};


/**
 * Works out miles per hour and minutes per mile for a given distance/time using the appropriate distance conversion unit.
 * @param {string|float} unitMult - Multiplier to convert to Miles
 * @param {string|float} distance - Distance convered in the lap
 * @param {string} time - Time taken to cover the lap
 * @return {object} An object containing mph (mile per hour) and mins (minutes per mile).
 */
const calcTimes = (unitMult, distance, time) => {
  const hh = Number.parseInt(time.substr(0, 2), 10) * 60 * 60;
  const mm = Number.parseInt(time.substr(3, 2), 10) * 60;
  const ss = Number.parseInt(time.substr(6, 2), 10);
  const miles = parseFloat(distance) * parseFloat(unitMult);

  let mph = 0;
  let mins = '00:00';

  if (miles > 0) {
    mph = Math.round(((miles / (hh + mm + ss)) * 60 * 60) * 100) / 100;
    if (mph > 0) {
      const minsPM = 60 / mph;
      let secsPM = Math.round((((minsPM) - Number.parseInt(minsPM, 10)) * 60));
      secsPM = (secsPM < 10) ? `0${secsPM}` : secsPM;
      mins = `${Number.parseInt(minsPM, 10)}:${secsPM}`;
    }
  }
  return { mph, mins };
};


/**
 * Parses a map and creates an array of its values.
 * @param {Object.<String, Float>} map - A map
 * @return {Object[]} An array containing the values in the map.
 */
const getValues = (map) => {
  const values = [];
  map.forEach((entry) => {
    values.push(entry);
  });


  return values;
};


export {
  lapsToReactRows,
  createLap,
  createSession,
  lapArrayToMap,
  calcTimes,
  getValues,
  cloneData,
};
