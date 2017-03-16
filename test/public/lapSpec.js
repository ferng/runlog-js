import React from 'react';
import test from 'tape';
import {shallow} from 'enzyme';
import {LapList, LapForm} from '../../public/lap';
import {getRandomLap, getNewLap} from './testHelpers';

const testLap1 = getRandomLap();
const testLap2 = getRandomLap();
const cleanLap = getNewLap('00:00:00', 0, '--');

test('LapList returns a div with Lap divs, one for each lap', (t) => {
    const expected = '<div class="lapList">' +
        '<div class="lap"><h2 class="lapHeader">' + testLap1['unit'] + '</h2>' + testLap1['distance'] + testLap1['time'] + '</div>' +
        '<div class="lap"><h2 class="lapHeader">' + testLap2['unit'] + '</h2>' + testLap2['distance'] + testLap2['time'] + '</div>' +
        '</div>';
    const data = [testLap1, testLap2];
    const wrapper = shallow(<LapList data={data} />);

    t.plan(1);
    t.equal(wrapper.html(), expected);
});


test('LapList returns an empty lap div when there are no laps', (t) => {
    const expected = '<div class="lapList"></div>';
    const data = [];
    const wrapper = shallow(<LapList data={data} />);

    t.plan(1);
    t.equal(wrapper.html(), expected);
});


test('Enter data into LapForm and the onchange events get called causing a new render and update values', (t) => {
    const getExpectedRender = (time, distance) => {
        return '<form class="LapForm">' +
            '<input type="time" step="1" id="newLapTime" placeholder="Time" value="' + time + '"/>' +
            '<input type="number" id="newLapDistance" placeholder="Distance" value="' + distance + '"/>' +
            '<select><option value="metre">metre</option><option value="yard">yard</option>' +
            '<option value="km">km</option><option value="mile">mile</option></select>' +
            '<input type="submit" value="Post"/></form>';
    };
    const wrapper = shallow(<LapForm />);

    t.plan(7);
    wrapper.find({id: 'newLapTime'}).simulate('change', {target: {value: '12:23:22'}});
    t.equal(wrapper.html(), getExpectedRender('12:23:22', 0));

    wrapper.find({id: 'newLapDistance'}).simulate('change', {target: {value: 57.24}});
    t.equal(wrapper.html(), getExpectedRender('12:23:22', 57.24));

    wrapper.find({id: 'newLapTime'}).simulate('change', {target: {value: '12:56:22'}});
    t.equal(wrapper.html(), getExpectedRender('12:56:22', 57.24));

    wrapper.find({id: 'newLapUnit'}).simulate('change', {target: {value: 'yard'}});
    t.equal(wrapper.html(), getExpectedRender('12:56:22', 57.24));
    t.equal(wrapper.find({id: 'newLapUnit'}).prop('value'), 'yard');

    wrapper.find({id: 'newLapUnit'}).simulate('change', {target: {value: 'mile'}});
    t.equal(wrapper.html(), getExpectedRender('12:56:22', 57.24));
    t.equal(wrapper.find({id: 'newLapUnit'}).prop('value'), 'mile');
});


test('Data returned by onLapSubmit becomes lap context state', (t) => {
    const dummyEventProxy = {
        preventDefault: () => {
        },
    };

    const onLapSubmit = (lapFromSubmit) => {
        t.plan(3);
        t.equal(lapFromSubmit['time'], testLap1['time']);
        t.equal(lapFromSubmit['distance'], testLap1['distance']);
        t.equal(lapFromSubmit['unit'], testLap1['unit']);
    };

    const wrapper = shallow(<LapForm onLapSubmit={onLapSubmit} />);

    wrapper.setState(testLap1);
    wrapper.simulate('submit', dummyEventProxy);
});


test('Submit resets lap context state', (t) => {
    const dummyEventProxy = {
        preventDefault: () => {
        },
    };

    const onLapSubmit = (lapFromSubmit) => {
    };

    const wrapper = shallow(<LapForm onLapSubmit={onLapSubmit} />);
    wrapper.setState(testLap1);
    t.plan(6);
    t.equal(wrapper.state('time'), testLap1['time']);
    t.equal(wrapper.state('distance'), testLap1['distance']);
    t.equal(wrapper.state('unit'), testLap1['unit']);

    wrapper.simulate('submit', dummyEventProxy);
    t.equal(wrapper.state('time'), cleanLap['time']);
    t.equal(wrapper.state('distance'), cleanLap['distance']);
    t.equal(wrapper.state('unit'), cleanLap['unit']);
});


test('Submit returns early without reseting state or subimtting if time is missing from lap data', (t) => {
    const dummyEventProxy = {
        preventDefault: () => {
        },
    };

    const onLapSubmit = (lapFromSubmit) => {
        t.fail('should not be reached');
    };

    const tstLap = getRandomLap();
    delete tstLap['time'];

    const wrapper = shallow(<LapForm onLapSubmit={onLapSubmit} />);
    wrapper.setState(tstLap);
    wrapper.simulate('submit', dummyEventProxy);

    t.plan(3);
    t.equal(wrapper.state('time'), cleanLap['time']);
    t.equal(wrapper.state('distance'), tstLap['distance']);
    t.equal(wrapper.state('unit'), tstLap['unit']);
});


test('Submit returns early without reseting state or subimtting if distance is missing from lap data', (t) => {
    const dummyEventProxy = {
        preventDefault: () => {
        },
    };

    const onLapSubmit = (lapFromSubmit) => {
        t.fail('should not be reached');
    };

    const tstLap = getRandomLap();
    delete tstLap['distance'];

    const wrapper = shallow(<LapForm onLapSubmit={onLapSubmit} />);
    wrapper.setState(tstLap);
    wrapper.simulate('submit', dummyEventProxy);

    t.plan(3);
    t.equal(wrapper.state('time'), tstLap['time']);
    t.equal(wrapper.state('distance'), cleanLap['distance']);
    t.equal(wrapper.state('unit'), tstLap['unit']);
});


test('Submit returns early without reseting state or subimtting if unit is missing from lap data', (t) => {
    const dummyEventProxy = {
        preventDefault: () => {
        },
    };

    const onLapSubmit = (lapFromSubmit) => {
        t.fail('should not be reached');
    };

    const tstLap = getRandomLap();
    delete tstLap['unit'];

    const wrapper = shallow(<LapForm onLapSubmit={onLapSubmit} />);
    wrapper.setState(tstLap);
    wrapper.simulate('submit', dummyEventProxy);

    t.plan(3);
    t.equal(wrapper.state('time'), tstLap['time']);
    t.equal(wrapper.state('distance'), tstLap['distance']);
    t.equal(wrapper.state('unit'), cleanLap['unit']);
});
