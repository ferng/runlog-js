import React from 'react';
import test from 'tape';
import {mount} from 'enzyme';
import {LapList} from '../../public/lapList.jsx';
import {getRandomLap, getRefData} from '../helpers/testData.js';
import {lapArrayToMap} from '../../public/lapTools.jsx';


test('LapList with one lap returns a row div with a single lap (plus one for entry)', (t) => {
    const context = {refData: getRefData()};
    const lapData = getRandomLap();
    const laps = lapArrayToMap([lapData]);
    const wrapper = mount(<LapList laps={laps} />, {context});
    const row = wrapper.children();

    t.plan(11);

    // one row
    t.equal(row.length, 1);

    // with one single lap and the new lap ready for entry
    t.equal(row.children().length, 2);

    // with data where it should be
    const lap = row.childAt(0);
    t.equal(lap.find('#dataTime').prop('children'), lapData['time']);
    t.equal(lap.find('#dataDist').prop('children'), lapData['distance']);
    t.equal(lap.find('#dataUnit').prop('children'), lapData['unit']);
    t.equal(parseFloat(lap.find('#dataMph').prop('children')) !== NaN, true);

    const mins = lap.find('#dataMph').parent().prop('title');
    t.equal(mins.startsWith('mins: '), true);
    t.equal(parseInt(mins.substring(9, 11)) !== NaN, true);

    // now check the data entry lap
    const entrylap = row.childAt(1);
    t.equal(entrylap.find('#time').prop('value'), '00:00:00');
    t.equal(entrylap.find('#distance').prop('value'), 0);
    t.equal(entrylap.find('#unit').children().length, 4);
});


test('LapList with 4 laps (plus one for entry) returns 2 row divs, second one with two laps', (t) => {
    const context = {refData: getRefData()};
    const lapData = [];
    for (let i = 0; i < 4; i++) {
        lapData.push(getRandomLap());
    }
    const laps = lapArrayToMap(lapData);
    const wrapper = mount(<LapList laps={laps} />, {context});
    const row = wrapper.children();

    t.plan(9);

    // two rows
    t.equal(row.length, 2);

    // with appropriate number of laps each
    t.equal(row.first().children().length, 3);
    t.equal(row.last().children().length, 2);

    const lap = row.last().childAt(0);
    // with data where it should be
    t.equal(lap.find('#dataTime').prop('children'), lapData[3]['time']);
    t.equal(lap.find('#dataDist').prop('children'), lapData[3]['distance']);
    t.equal(lap.find('#dataUnit').prop('children'), lapData[3]['unit']);
    t.equal(parseFloat(lap.find('#dataMph').prop('children')) !== NaN, true);

    const mins = lap.find('#dataMph').parent().prop('title');
    t.equal(mins.startsWith('mins: '), true);
    t.equal(parseInt(mins.substring(9, 11)) !== NaN, true);
});


test('LapList decides which lap is being edited by simply clicking on it', (t) => {
    const context = {refData: getRefData()};
    const lapData = getRandomLap();
    const laps = lapArrayToMap([lapData]);
    const wrapper = mount(<LapList laps={laps} />, {
        context: context,
        childContextTypes: {
            multipliers: React.PropTypes.object,
            refData: React.PropTypes.object,
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


// test('LapList returns a single data entry lap when there are no existing data laps', (t) => {
//     const context = {refData: getRefData()};
//     const lapData = [];
//     const laps = lapArrayToMap(lapData);
//     const wrapper = shallow(<LapList laps={laps} />, {context});
//     const row = wrapper.children();

//     t.plan(5);

//     // one row
//     t.equal(row.length, 1);

//     // with one the new lap ready for entry
//     t.equal(row.children().length, 1);

//     // now check the data entry lap
//     const entrylap = row.childAt(1);
//     t.equal(entrylap.find('#time').prop('value'), '00:00:00');
//     t.equal(entrylap.find('#distance').prop('value'), 0);
//     t.equal(entrylap.find('#unit').children().length, 4);
// });
