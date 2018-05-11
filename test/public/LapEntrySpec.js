import React from 'react';
import Enzyme from 'enzyme';
import {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import test from 'tape';
import sinon from 'sinon';
import {LapEntry} from '../../public/LapEntry.jsx';
import {getRandomLap, getNewLap, getRefData} from '../helpers/testData.js';

Enzyme.configure({ adapter: new Adapter() });

const testLap1 = getRandomLap();
const testLap2 = getRandomLap();
const cleanLap = getNewLap('00:00:00', 0, '--');


test('LapEntry is well formed', (t) => {
  const context = {refData: getRefData()};
  const wrapper = mount(<LapEntry time={cleanLap.time} distance={cleanLap.distance} unit={cleanLap.unit} />, {
    context: context,
    childContextTypes: {
      multipliers: PropTypes.object,
      refData: PropTypes.object,
    },
  });

  t.plan(2);
  t.equal(wrapper.find('input').length, 2);
  t.equal(wrapper.find('select').length, 1);
});


test('changes to time and distance update the state but do not trigger an onChange', (t) => {
  const onChange = sinon.spy();
  const context = {refData: getRefData()};
  const wrapper = mount(
    <LapEntry time={testLap1.time} distance={testLap1.distance} unit={testLap1.unit} onChange={onChange} />, {
      context: context,
      childContextTypes: {
        multipliers: PropTypes.object,
        refData: PropTypes.object,
      },
    }
  );
  const instance = wrapper.instance();

  t.plan(6);
  // make sure state is set
  t.equal(instance.state['time'], testLap1['time']);
  t.equal(instance.state['distance'], testLap1['distance']);
  t.equal(instance.state['unit'], testLap1['unit']);

  // make sure state is updated
  wrapper.find('#time').simulate('change', {target: {value: testLap2['time']}});
  t.equal(instance.state['time'], testLap2['time']);
  wrapper.find('#distance').simulate('change', {target: {value: testLap2['distance']}});
  t.equal(instance.state['distance'], testLap2['distance']);

  // but LapEntry onChange is not called
  t.equal(onChange.notCalled, true);
});


test('changes to time and distance update the state and onBlur triggers an onChange', (t) => {
  const onChange = sinon.spy();
  const context = {refData: getRefData()};
  const wrapper = mount(
    <LapEntry time={testLap1.time} distance={testLap1.distance} unit={testLap1.unit} onChange={onChange} />, {
      context: context,
      childContextTypes: {
        multipliers: PropTypes.object,
        refData: PropTypes.object,
      },
    }
  );
  const instance = wrapper.instance();

  t.plan(6);
  // make sure state is set
  t.equal(instance.state['time'], testLap1['time']);
  t.equal(instance.state['distance'], testLap1['distance']);
  t.equal(instance.state['unit'], testLap1['unit']);

  // make sure state is updated
  wrapper.find('#time').simulate('change', {target: {value: testLap2['time']}});
  t.equal(instance.state['time'], testLap2['time']);
  wrapper.find('#time').simulate('blur');
  wrapper.find('#distance').simulate('change', {target: {value: testLap2['distance']}});
  t.equal(instance.state['distance'], testLap2['distance']);
  wrapper.find('#distance').simulate('blur');

  // but LapEntry onChange is not called
  t.equal(onChange.calledTwice, true);
});


test('changes to units update the state and an onChange', (t) => {
  const onChange = sinon.spy();
  const context = {refData: getRefData()};
  const wrapper = mount(
    <LapEntry time={testLap1.time} distance={testLap1.distance} unit={testLap1.unit} onChange={onChange} />, {
      context: context,
      childContextTypes: {
        multipliers: PropTypes.object,
        refData: PropTypes.object,
      },
    }
  );
  const instance = wrapper.instance();

  t.plan(5);
  // make sure state is set
  t.equal(instance.state['time'], testLap1['time']);
  t.equal(instance.state['distance'], testLap1['distance']);
  t.equal(instance.state['unit'], testLap1['unit']);

  // make sure state is updated
  wrapper.find('#unit').simulate('change', {target: {value: testLap2['unit']}});
  t.equal(instance.state['unit'], testLap2['unit']);

  // but LapEntry onChange is not called
  t.equal(onChange.calledOnce, true);
});
