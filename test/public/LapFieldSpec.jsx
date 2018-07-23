import React from 'react';
import { Enzyme, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import test from 'tape';
import { LapField } from '../../public/LapField';
import { getRandomLap, getRefData, getDistanceMults } from '../helpers/testData';

Enzyme.configure({ adapter: new Adapter() });

const context = { refData: getRefData(), multipliers: getDistanceMults() };


test('LapField returns a lap if editing (editLap prop) is not defined', (t) => {
  const lap = getRandomLap();

  t.plan(2);
  const wrapper = mount(<LapField lap={lap} />, {
    context,
    childContextTypes: {
      multipliers: PropTypes.object,
      refData: PropTypes.object,
    },
  });
  t.equal(wrapper.find('.lap').length, 1);
  t.equal(wrapper.find('.LapForm').length, 0);
});


test('LapField returns a lap if editing (editLap prop) is false', (t) => {
  const lap = getRandomLap();

  t.plan(2);
  const wrapper = mount(<LapField lap={lap} editLap={false} />, {
    context,
    childContextTypes: {
      multipliers: PropTypes.object,
      refData: PropTypes.object,
    },
  });
  t.equal(wrapper.find('.lap').length, 1);
  t.equal(wrapper.find('.LapForm').length, 0);
});


test('LapField returns a lap entry form if editing (editLap prop) is true', (t) => {
  const lap = getRandomLap();

  t.plan(2);
  const wrapper = mount(<LapField lap={lap} editLap={true} />, {
    context,
    childContextTypes: {
      multipliers: PropTypes.object,
      refData: PropTypes.object,
    },
  });
  t.equal(wrapper.find('.lap').length, 0);
  t.equal(wrapper.find('.LapForm').length, 1);
});
