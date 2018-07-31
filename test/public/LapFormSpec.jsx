import React from 'react';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import test from 'tape';
import sinon from 'sinon';
import LapForm from '../../public/LapForm';
import { getRandomLap, getNewLap, getRefData } from '../helpers/testData';

Enzyme.configure({ adapter: new Adapter() });

const testLap1 = getRandomLap();
const cleanLap = getNewLap('00:00:00', 0, '--');


test('Enter data into LapForm, the onchange events get called causing a new render and update values', (t) => {
  const testCases = [
    {
      elementId: 'unit', updatedValue: 'yard', returnedTime: '00:00:00', returnedDistance: 0, returnedUnit: 'yard',
    },
    {
      elementId: 'unit', updatedValue: 'mile', returnedTime: '00:00:00', returnedDistance: 0, returnedUnit: 'mile',
    },
    {
      elementId: 'time', updatedValue: '12:56:22', returnedTime: '12:56:22', returnedDistance: 0, returnedUnit: 'mile',
    },
    {
      elementId: 'time', updatedValue: '12:37:38', returnedTime: '12:37:38', returnedDistance: 0, returnedUnit: 'mile',
    },
    {
      elementId: 'distance', updatedValue: 22, returnedTime: '12:37:38', returnedDistance: 22, returnedUnit: 'mile',
    },
    {
      elementId: 'distance', updatedValue: 0.76, returnedTime: '12:37:38', returnedDistance: 0.76, returnedUnit: 'mile',
    },
  ];

  const context = { refData: getRefData() };
  const wrapper = Enzyme.mount(<LapForm lap={cleanLap} />, {
    context,
    childContextTypes: {
      multipliers: PropTypes.object,
      refData: PropTypes.array,
    },
  });

  t.plan(testCases.length * 3);
  (Object.values(testCases)).forEach((testCase) => {
    wrapper.find({ id: testCase.elementId }).first().simulate('change', { target: { id: testCase.elementId, value: testCase.updatedValue } });
    t.equal(wrapper.find('#time').prop('value'), testCase.returnedTime);
    t.equal(wrapper.find('#distance').prop('value'), testCase.returnedDistance);
    t.equal(wrapper.find('#unit').first().prop('value'), testCase.returnedUnit);
  });
});


test('LapForm is well formed', (t) => {
  const onLapSubmit = sinon.spy();
  const context = { refData: getRefData() };
  const wrapper = Enzyme.mount(<LapForm lap={cleanLap} onLapSubmit={onLapSubmit} />, {
    context,
    childContextTypes: {
      multipliers: PropTypes.object,
      refData: PropTypes.array,
    },
  });

  t.plan(5);
  t.equal(wrapper.find('input').length, 2);
  t.equal(wrapper.find('select').length, 1);
  t.equal(wrapper.find('[type="submit"]').length, 1);
  t.equal(wrapper.find('form').length, 1);

  const instance = wrapper.instance();
  t.equal((typeof instance.props.onLapSubmit), 'function');
});


test('onLapSubmit returns the lap context state set by front end', (t) => {
  const onLapSubmit = sinon.spy();
  const context = { refData: getRefData() };
  const wrapper = Enzyme.mount(<LapForm lap={testLap1} onLapSubmit={onLapSubmit} />, {
    context,
    childContextTypes: {
      multipliers: PropTypes.object,
      refData: PropTypes.array,
    },
  });

  t.plan(6);
  const instance = wrapper.instance();
  // checking the state has been set
  t.equal(instance.state.time, testLap1.time);

  wrapper.find('button').simulate('submit');
  // checking the state has been reset following subnmit
  t.equal(instance.state.time, '00:00:00');

  // checking returned lap is what state used to be
  const actualData = (onLapSubmit.args[0][0]).lap;
  t.equal(onLapSubmit.calledOnce, true);
  t.equal(actualData.time, testLap1.time);
  t.equal(actualData.distance, testLap1.distance);
  t.equal(actualData.unit, testLap1.unit);
});


test('onLapSubmit resets lap context state', (t) => {
  const onLapSubmit = sinon.spy();
  const context = { refData: getRefData() };
  const wrapper = Enzyme.mount(<LapForm lap={testLap1} onLapSubmit={onLapSubmit} />, {
    context,
    childContextTypes: {
      multipliers: PropTypes.object,
      refData: PropTypes.array,
    },
  });

  t.plan(6);
  const instance = wrapper.instance();
  // make sure state is set
  t.equal(instance.state.time, testLap1.time);
  t.equal(instance.state.distance, testLap1.distance);
  t.equal(instance.state.unit, testLap1.unit);

  wrapper.find('button').simulate('submit');
  // make sure state has been reset
  t.equal(instance.state.time, cleanLap.time);
  t.equal(instance.state.distance, cleanLap.distance);
  t.equal(instance.state.unit, cleanLap.unit);
});


test('onLapSubmit returns early without reseting state or submitting if time is missing from lap data', (t) => {
  const onLapSubmit = sinon.spy();
  const context = { refData: getRefData() };
  const wrapper = Enzyme.mount(<LapForm lap={cleanLap} onLapSubmit={onLapSubmit} />, {
    context,
    childContextTypes: {
      multipliers: PropTypes.object,
      refData: PropTypes.array,
    },
  });

  const testLap = getRandomLap();
  delete testLap.time;
  wrapper.setState(testLap);
  wrapper.find('button').simulate('submit');

  t.plan(8);
  const instance = wrapper.instance();
  // submit not called
  t.equal(onLapSubmit.called, false);

  // state not reset
  t.equal(instance.state.time, cleanLap.time);
  t.equal(instance.state.distance, testLap.distance);
  t.equal(instance.state.unit, testLap.unit);

  testLap.time = '00:00:00';
  wrapper.setState(testLap);
  wrapper.find('button').simulate('submit');

  // submit not called
  t.equal(onLapSubmit.called, false);

  // state not reset
  t.equal(instance.state.time, cleanLap.time);
  t.equal(instance.state.distance, testLap.distance);
  t.equal(instance.state.unit, testLap.unit);
});


test('onLapSubmit returns early without reseting state or submitting if distance is missing from lap data', (t) => {
  const onLapSubmit = sinon.spy();
  const context = { refData: getRefData() };
  const wrapper = Enzyme.mount(<LapForm lap={cleanLap} onLapSubmit={onLapSubmit} />, {
    context,
    childContextTypes: {
      multipliers: PropTypes.object,
      refData: PropTypes.array,
    },
  });

  const testLap = getRandomLap();
  delete testLap.distance;
  wrapper.setState(testLap);
  wrapper.find('button').simulate('submit');

  t.plan(8);
  const instance = wrapper.instance();
  // submit not called
  t.equal(onLapSubmit.called, false);

  // state not reset
  t.equal(instance.state.time, testLap.time);
  t.equal(instance.state.distance, cleanLap.distance);
  t.equal(instance.state.unit, testLap.unit);

  testLap.distance = 0;
  wrapper.setState(testLap);
  wrapper.find('button').simulate('submit');

  // submit not called
  t.equal(onLapSubmit.called, false);

  // state not reset
  t.equal(instance.state.time, testLap.time);
  t.equal(instance.state.distance, cleanLap.distance);
  t.equal(instance.state.unit, testLap.unit);
});


test('onLapSubmit returns early without reseting state or submitting if unit is missing from lap data', (t) => {
  const onLapSubmit = sinon.spy();
  const context = { refData: getRefData() };
  const wrapper = Enzyme.mount(<LapForm lap={cleanLap} onLapSubmit={onLapSubmit} />, {
    context,
    childContextTypes: {
      multipliers: PropTypes.object,
      refData: PropTypes.array,
    },
  });

  const tstLap = getRandomLap();
  delete tstLap.unit;
  wrapper.setState(tstLap);
  wrapper.find('button').simulate('submit');

  t.plan(8);
  const instance = wrapper.instance();
  // submit not called
  t.equal(onLapSubmit.called, false);

  // state not reset
  t.equal(instance.state.time, tstLap.time);
  t.equal(instance.state.distance, tstLap.distance);
  t.equal(instance.state.unit, cleanLap.unit);

  tstLap.unit = '--';
  wrapper.setState(tstLap);
  wrapper.find('button').simulate('submit');

  // submit not called
  t.equal(onLapSubmit.called, false);

  // state not reset
  t.equal(instance.state.time, tstLap.time);
  t.equal(instance.state.distance, tstLap.distance);
  t.equal(instance.state.unit, cleanLap.unit);
});
