import React from 'react';
import test from 'tape';
import {shallow} from 'enzyme';
import SelectOpts from '../../public/SelectOpts.jsx';


test('LelectOpts returns a select with dropdown options from data given to it or none if no data', (t) => {
    const tests = [
        {options: ['onions', 'carrots', 'cucumber', 'lettuce', 'tomato'], expected: 5},
        {options: [], expected: 0},
        {options: '', expected: 0},
    ];

    t.plan(tests.length * 2);
    for (let test of tests.values()) {
        const wrapper = shallow(<SelectOpts options={test.options} />);
        t.equal(wrapper.is('select'), true);
        t.equal(wrapper.children().length, test.expected);
    }
});


test('SelectOpts returns a select with the onChange function we gave it', (t) => {
    const tmpFn = () => {
        return 50;
    };
    const wrapper = shallow(<SelectOpts selectOpts={[]} onChange={tmpFn} />);

    t.plan(1);
    t.equal(wrapper.instance().props['onChange'](), 50);
});
