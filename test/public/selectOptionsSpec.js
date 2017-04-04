import React from 'react';
import test from 'tape';
import {shallow} from 'enzyme';
import SelectOpts from '../../public/selectOptions';


test('SelectOpts returns a select with dropdown options from data given to it', (t) => {
    const optionData = ['onions', 'carrots', 'cucumber', 'lettuce', 'tomato'];
    const expected = '<select><option value="onions">onions</option><option value="carrots">carrots</option>' +
        '<option value="cucumber">cucumber</option><option value="lettuce">lettuce</option>' +
        '<option value="tomato">tomato</option></select>';
    const wrapper = shallow(<SelectOpts options={optionData} />);

    t.plan(1);
    t.equal(wrapper.html(), expected);
});


test('SelectOpts returns empty select for empty option list', (t) => {
    const expected = '<select></select>';
    const wrapper = shallow(<SelectOpts selectOpts={[]} />);

    t.plan(1);
    t.equal(wrapper.html(), expected);
});


test('SelectOpts returns empty select for missing option list', (t) => {
    const expected = '<select></select>';
    const wrapper = shallow(<SelectOpts selectOpts='' />);

    t.plan(1);
    t.equal(wrapper.html(), expected);
});


test('SelectOpts returns empty select for missing option parameter', (t) => {
    const expected = '<select></select>';
    const wrapper = shallow(<SelectOpts />);

    t.plan(1);
    t.equal(wrapper.html(), expected);
});


test('SelectOpts returns a select with the onChange function we gave it', (t) => {
    const tmpFn = () => {
        return 50;
    };
    const wrapper = shallow(<SelectOpts selectOpts={[]} onChange={tmpFn} />);

    t.plan(1);
    t.equal(wrapper.instance().props['onChange'](), 50);
});
