import React from 'react';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import test from 'tape';
import Lap from '../../public/Lap';
import { getRandomLap, getRefData, getDistanceMults } from '../helpers/testData';

Enzyme.configure({ adapter: new Adapter() });

test('Lap is well formed and speed items are where they should be', (t) => {
  const lap = getRandomLap();
  const context = { refData: getRefData(), multipliers: getDistanceMults() };

  t.plan(11);
  const wrapper = Enzyme.shallow(<Lap lap={lap} />, { context });
  t.equal(wrapper.find('.four.columns.left').length, 1);
  t.equal(wrapper.find('.lap').length, 1);
  t.equal(wrapper.find('.three.columns').length, 4);
  t.equal(wrapper.find('#lapTimeLabel').length, 1);
  t.equal(wrapper.find('#dataTime').length, 1);
  t.equal(wrapper.find('#lapDistLabel').length, 1);
  t.equal(wrapper.find('#dataDist').length, 1);
  t.equal(wrapper.find('#lapUnitLabel').length, 1);
  t.equal(wrapper.find('#dataUnit').length, 1);
  t.equal(wrapper.find('#lapMphLabel').length, 1);
  t.equal(wrapper.find('#dataMph').length, 1);
});

