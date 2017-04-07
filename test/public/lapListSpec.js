import React from 'react';
import test from 'tape';
import {shallow, mount} from 'enzyme';
import {LapList} from '../../public/lapList.jsx';
import {getRandomLap, getRefData} from '../helpers/testData.js';

test('LapList with one lap returns a row div with a single lap', (t) => {
    const context = {refData: getRefData()};
    const data = [];
    data.push(getRandomLap());

    const wrapper = mount(<LapList data={data} />, {context});
    const row = wrapper.children();
    const lap = row.childAt(0);

    t.plan(8);

    // one row
    t.equal(row.length, 1);

    // with one single lap
    t.equal(row.children().length, 1);

    // with data where it should be
    t.equal(lap.find('#dataTime').prop('children'), data[0]['time']);
    t.equal(lap.find('#dataDist').prop('children'), data[0]['distance']);
    t.equal(lap.find('#dataUnit').prop('children'), data[0]['unit']);
    t.equal(parseFloat(lap.find('#dataMph').prop('children')) !== NaN, true);

    const mins = lap.find('#dataMph').parent().prop('title');
    t.equal(mins.startsWith('mins: '), true);
    t.equal(parseInt(mins.substring(9, 11)) !== NaN, true);
});


test('LapList with 5 laps returns 2 row divs, second one with two laps', (t) => {
    const context = {refData: getRefData()};
    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push(getRandomLap());
    }
    const wrapper = mount(<LapList data={data} />, {context});
    const row = wrapper.children();

    const lap = row.last().childAt(1);

    t.plan(9);

    // two rows
    t.equal(row.length, 2);

    // with appropriate number of laps each
    t.equal(row.first().children().length, 3);
    t.equal(row.last().children().length, 2);

    // // with data where it should be
    t.equal(lap.find('#dataTime').prop('children'), data[4]['time']);
    t.equal(lap.find('#dataDist').prop('children'), data[4]['distance']);
    t.equal(lap.find('#dataUnit').prop('children'), data[4]['unit']);
    t.equal(parseFloat(lap.find('#dataMph').prop('children')) !== NaN, true);

    const mins = lap.find('#dataMph').parent().prop('title');
    t.equal(mins.startsWith('mins: '), true);
    t.equal(parseInt(mins.substring(9, 11)) !== NaN, true);
});


test('LapList returns an empty lap div when there are no laps', (t) => {
    const context = {refData: getRefData()};
    const data = [];
    const wrapper = shallow(<LapList data={data} />, {context});

    t.plan(1);
    t.equal(wrapper.node, null);
});
