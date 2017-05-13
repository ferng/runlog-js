import React from 'react';
import test from 'tape';
import {mount} from 'enzyme';
import {LapField} from '../../public/LapField.jsx';
import {getRandomLap, getRefData, getDistanceMults} from '../helpers/testData.js';

const context = {refData: getRefData(), multipliers: getDistanceMults()};


test('LapField returns a lap if editing (editLap prop) is not defined', (t) => {
    const lap = getRandomLap();

    t.plan(2);
    const wrapper = mount(<LapField lap={lap} />, {
        context: context,
        childContextTypes: {
            multipliers: React.PropTypes.object,
            refData: React.PropTypes.object,
        },
    });
    t.equal(wrapper.find('.lap').length, 1);
    t.equal(wrapper.find('.LapForm').length, 0);
});

test('LapField returns a lap if editing (editLap prop) is false', (t) => {
    const lap = getRandomLap();

    t.plan(2);
    const wrapper = mount(<LapField lap={lap} editLap={false} />, {
        context: context,
        childContextTypes: {
            multipliers: React.PropTypes.object,
            refData: React.PropTypes.object,
        },
    });
    t.equal(wrapper.find('.lap').length, 1);
    t.equal(wrapper.find('.LapForm').length, 0);
});

test('LapField returns a lap entry form if editing (editLap prop) is true', (t) => {
    const lap = getRandomLap();

    t.plan(2);
    const wrapper = mount(<LapField lap={lap} editLap={true} />, {
        context: context,
        childContextTypes: {
            multipliers: React.PropTypes.object,
            refData: React.PropTypes.object,
        },
    });
    t.equal(wrapper.find('.lap').length, 0);
    t.equal(wrapper.find('.LapForm').length, 1);
});
