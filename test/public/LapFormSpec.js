import React from 'react';
import test from 'tape';
import sinon from 'sinon';
import {shallow, mount} from 'enzyme';
import {LapForm} from '../../public/LapForm.jsx';
import {getRandomLap, getNewLap, getRefData} from '../helpers/testData.js';

const testLap1 = getRandomLap();
const cleanLap = getNewLap('00:00:00', 0, '--');


test('Enter data into LapForm, the onchange events get called causing a new render and update values', (t) => {
    const tests = [
        {elementId: 'newLapTime', updatedValue: '12:23:22', returnedTime: '12:23:22', returnedDistance: 0, returnedUnit: '--'},
        {elementId: 'newLapDistance', updatedValue: 57.24, returnedTime: '12:23:22', returnedDistance: 57.24, returnedUnit: '--'},
        {elementId: 'newLapTime', updatedValue: '12:56:22', returnedTime: '12:56:22', returnedDistance: 57.24, returnedUnit: '--'},
        {elementId: 'newLapTime', updatedValue: '12:56:22', returnedTime: '12:56:22', returnedDistance: 57.24, returnedUnit: '--'},
        {elementId: 'newLapUnit', updatedValue: 'yard', returnedTime: '12:56:22', returnedDistance: 57.24, returnedUnit: 'yard'},
        {elementId: 'newLapUnit', updatedValue: 'mile', returnedTime: '12:56:22', returnedDistance: 57.24, returnedUnit: 'mile'},
    ];

    let context = {refData: getRefData()};
    const wrapper = shallow(<LapForm lap={cleanLap}/>, {context: context});
    t.plan(tests.length * 3);
    for (let test of tests.values()) {
        wrapper.find({id: test.elementId}).simulate('change', {target: {value: test.updatedValue}});
        t.equal(wrapper.find('#newLapTime').prop('value'), test.returnedTime);
        t.equal(wrapper.find('#newLapDistance').prop('value'), test.returnedDistance);
        t.equal(wrapper.find('#newLapUnit').prop('value'), test.returnedUnit);
    }
});


test('LapForm is well formed', (t) => {
    const onLapSubmit = sinon.spy();
    const context = {refData: getRefData()};
    const wrapper = mount(<LapForm lap={cleanLap} onLapSubmit={onLapSubmit} />, {context: context});

    t.plan(5);
    t.equal(wrapper.find('input').length, 2);
    t.equal(wrapper.find('select').length, 1);
    t.equal(wrapper.find('[type="submit"]').length, 1);
    t.equal(wrapper.find('form').length, 1);

    const instance = wrapper.instance();
    t.equal((typeof instance.props['onLapSubmit']), 'function');
});


test('onLapSubmit returns the lap context state set by front end', (t) => {
    const onLapSubmit = sinon.spy();
    const context = {refData: getRefData()};
    const wrapper = mount(<LapForm lap={testLap1} onLapSubmit={onLapSubmit} />, {context: context});
    const instance = wrapper.instance();

    t.plan(6);
    // checking the state has been set
    t.equal(instance.state['time'], testLap1.time);

    wrapper.find('button').simulate('submit');
    // checking the state has been reset following subnmit
    t.equal(instance.state['time'], '00:00:00');

    // checking returned lap is what state used to be
    const actualData = onLapSubmit.args[0][0];
    t.equal(onLapSubmit.calledOnce, true);
    t.equal(actualData['time'], testLap1.time);
    t.equal(actualData['distance'], testLap1.distance);
    t.equal(actualData['unit'], testLap1.unit);
});


test('onLapSubmit resets lap context state', (t) => {
    const onLapSubmit = sinon.spy();
    const context = {refData: getRefData()};
    const wrapper = mount(<LapForm lap={testLap1} onLapSubmit={onLapSubmit} />, {context: context});
    const instance = wrapper.instance();

    t.plan(6);
    // make sure state is set
    t.equal(instance.state['time'], testLap1['time']);
    t.equal(instance.state['distance'], testLap1['distance']);
    t.equal(instance.state['unit'], testLap1['unit']);

    wrapper.find('button').simulate('submit');
    // make sure state has been reset
    t.equal(instance.state['time'], cleanLap['time']);
    t.equal(instance.state['distance'], cleanLap['distance']);
    t.equal(instance.state['unit'], cleanLap['unit']);
});


test('onLapSubmit returns early without reseting state or submitting if time is missing from lap data', (t) => {
    const onLapSubmit = sinon.spy();
    const context = {refData: getRefData()};
    const wrapper = mount(<LapForm lap={cleanLap} onLapSubmit={onLapSubmit} />, {context: context});
    const instance = wrapper.instance();
    const tstLap = getRandomLap();

    delete tstLap['time'];
    wrapper.setState(tstLap);
    wrapper.find('button').simulate('submit');

    t.plan(8);
    // submit not called
    t.equal(onLapSubmit.called, false);

    // state not reset
    t.equal(instance.state['time'], cleanLap['time']);
    t.equal(instance.state['distance'], tstLap['distance']);
    t.equal(instance.state['unit'], tstLap['unit']);

    tstLap['time'] = '00:00:00';
    wrapper.setState(tstLap);
    wrapper.find('button').simulate('submit');

    // submit not called
    t.equal(onLapSubmit.called, false);

    // state not reset
    t.equal(instance.state['time'], cleanLap['time']);
    t.equal(instance.state['distance'], tstLap['distance']);
    t.equal(instance.state['unit'], tstLap['unit']);
});


test('onLapSubmit returns early without reseting state or submitting if distance is missing from lap data', (t) => {
    const onLapSubmit = sinon.spy();
    const context = {refData: getRefData()};
    const wrapper = mount(<LapForm lap={cleanLap} onLapSubmit={onLapSubmit} />, {context: context});
    const instance = wrapper.instance();
    const tstLap = getRandomLap();

    delete tstLap['distance'];
    wrapper.setState(tstLap);
    wrapper.find('button').simulate('submit');

    t.plan(8);
    // submit not called
    t.equal(onLapSubmit.called, false);

    // state not reset
    t.equal(instance.state['time'], tstLap['time']);
    t.equal(instance.state['distance'], cleanLap['distance']);
    t.equal(instance.state['unit'], tstLap['unit']);

    tstLap['distance'] = 0;
    wrapper.setState(tstLap);
    wrapper.find('button').simulate('submit');

    // submit not called
    t.equal(onLapSubmit.called, false);

    // state not reset
    t.equal(instance.state['time'], tstLap['time']);
    t.equal(instance.state['distance'], cleanLap['distance']);
    t.equal(instance.state['unit'], tstLap['unit']);
});


test('onLapSubmit returns early without reseting state or submitting if unit is missing from lap data', (t) => {
    const onLapSubmit = sinon.spy();
    const context = {refData: getRefData()};
    const wrapper = mount(<LapForm lap={cleanLap} onLapSubmit={onLapSubmit} />, {context: context});
    const instance = wrapper.instance();
    const tstLap = getRandomLap();

    delete tstLap['unit'];
    wrapper.setState(tstLap);
    wrapper.find('button').simulate('submit');

    t.plan(8);
    // submit not called
    t.equal(onLapSubmit.called, false);

    // state not reset
    t.equal(instance.state['time'], tstLap['time']);
    t.equal(instance.state['distance'], tstLap['distance']);
    t.equal(instance.state['unit'], cleanLap['unit']);

    tstLap['unit'] = '--';
    wrapper.setState(tstLap);
    wrapper.find('button').simulate('submit');

    // submit not called
    t.equal(onLapSubmit.called, false);

    // state not reset
    t.equal(instance.state['time'], tstLap['time']);
    t.equal(instance.state['distance'], tstLap['distance']);
    t.equal(instance.state['unit'], cleanLap['unit']);
});
