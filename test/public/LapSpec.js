import React from 'react';
import test from 'tape';
import {shallow} from 'enzyme';
import {Lap} from '../../public/Lap.jsx';
import {getRandomLap, getRefData, getDistanceMults} from '../helpers/testData.js';


test('Lap is well formed and speed items are where they should be', (t) => {
    const lap = getRandomLap();
    let context = {refData: getRefData(), multipliers: getDistanceMults()};

    t.plan(11);
    const wrapper = shallow(<Lap lap={lap}/>, {context});
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

