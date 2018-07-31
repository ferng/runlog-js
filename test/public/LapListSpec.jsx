import React from 'react';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import test from 'tape';
import LapList from '../../public/LapList';
import { getRandomLap, getRefData } from '../helpers/testData';
import { lapArrayToMap } from '../../public/lapTools';

Enzyme.configure({ adapter: new Adapter() });

test('LapList with one lap returns a row div with a single lap (plus one for entry)', (t) => {
  const context = { refData: getRefData() };
  const lapData = getRandomLap();
  const laps = lapArrayToMap([lapData]);
  const wrapper = Enzyme.mount(<LapList laps={laps} />, { context });
  const foundRow = wrapper.find('LapRow');
  const foundLaps = wrapper.find('LapField');

  t.plan(11);

  // one row
  t.equal(foundRow.length, 1);

  // with one single lap and the new lap ready for entry
  t.equal(foundLaps.length, 2);

  // with data where it should be
  const lap = foundLaps.at(0);
  t.equal(lap.find('#dataTime').prop('children'), lapData.time);
  t.equal(lap.find('#dataDist').prop('children'), lapData.distance);
  t.equal(lap.find('#dataUnit').prop('children'), lapData.unit);
  t.false(Number.isNaN(parseFloat(lap.find('#dataMph').prop('children'))));

  const mins = lap.find('#dataMph').parent().prop('title');
  t.equal(mins.startsWith('mins: '), true);
  t.false(Number.isNaN(parseInt(mins.substring(mins.length - 2, mins.length), 10)));

  // now check the data entry lap
  const entrylap = foundLaps.at(1);
  t.equal(entrylap.find('#time').prop('value'), '00:00:00');
  t.equal(entrylap.find('#distance').prop('value'), 0);
  t.equal(entrylap.find('#unit').first().children().length, 1);
});


test('LapList with 4 laps (plus one for entry) returns 2 row divs, second one with two laps', (t) => {
  const context = { refData: getRefData() };
  const lapData = [];
  for (let i = 0; i < 4; i++) {
    lapData.push(getRandomLap());
  }
  const laps = lapArrayToMap(lapData);
  const wrapper = Enzyme.mount(<LapList laps={laps} />, { context });
  const foundRows = wrapper.find('LapRow');

  t.plan(9);
  // two rows
  t.equal(foundRows.length, 2);

  // with appropriate number of laps each
  t.equal(foundRows.first().find('LapField').length, 3);
  t.equal(foundRows.last().find('LapField').length, 2);

  const lap = foundRows.last().find('LapField').first();
  // with data where it should be
  t.equal(lap.find('#dataTime').prop('children'), lapData[3].time);
  t.equal(lap.find('#dataDist').prop('children'), lapData[3].distance);
  t.equal(lap.find('#dataUnit').prop('children'), lapData[3].unit);
  t.false(Number.isNaN(parseFloat(lap.find('#dataMph').prop('children'))));

  const mins = lap.find('#dataMph').parent().prop('title');
  t.equal(mins.startsWith('mins: '), true);
  t.false(Number.isNaN(parseInt(mins.substring(mins.length - 2, mins.length), 10)));
});


test('LapList decides which lap is being edited by simply clicking on it', (t) => {
  const context = { refData: getRefData() };
  const lapData = getRandomLap();
  const laps = lapArrayToMap([lapData]);
  const wrapper = Enzyme.mount(<LapList laps={laps} />, {
    context,
    childContextTypes: {
      multipliers: PropTypes.object,
      refData: PropTypes.array,
    },
  });

  const lapField = wrapper.find('.four.columns').first();

  t.plan(2);

  // initially the new 00 lap is set for editing
  t.equal(wrapper.state('lapToEdit'), 0);

  // we then select the 1st existing lap for editing
  lapField.simulate('click');
  t.equal(wrapper.state('lapToEdit'), lapData.id);
});


test('LapList returns a single data entry lap when there are no existing data laps', (t) => {
  const context = { refData: getRefData() };
  const laps = lapArrayToMap([]);
  const wrapper = Enzyme.mount(<LapList laps={laps} />, { context });
  const foundRow = wrapper.find('LapRow');

  t.plan(5);
  // one row
  t.equal(foundRow.length, 1);

  const foundLaps = wrapper.find('LapField');
  // with one the new lap ready for entry
  t.equal(foundLaps.length, 1);

  // now check the data entry lap
  const entryLap = foundLaps.at(0);
  t.equal(entryLap.find('#time').prop('value'), '00:00:00');
  t.equal(entryLap.find('#distance').prop('value'), 0);
  t.equal(entryLap.find('#unit').first().prop('value'), '--');
});
