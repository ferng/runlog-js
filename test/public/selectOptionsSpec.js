import React from 'react';
import test from 'tape';
import {shallow} from 'enzyme';
import SelectOpts from '../../public/selectOptions';

test('SelectOpts returns populated select collection for valid option type', (t) => {
    const expected = '<select><option value="metre">metre</option><option value="yard">yard</option>' +
        '<option value="km">km</option><option value="mile">mile</option></select>';
    const wrapper = shallow(<SelectOpts optType="unit" />);

    t.plan(1);
    t.equal(expected, wrapper.html());
});


test('SelectOpts returns empty select collection for unknow option type', (t) => {
    const expected = '<select></select>';
    const wrapper = shallow(<SelectOpts optType="onions" />);

    t.plan(1);
    t.equal(expected, wrapper.html());
});


test('SelectOpts returns a populated select collection with the onChange function we gave it', (t) => {
    const tmpFn = () => {
        return 50;
    };
    const wrapper = shallow(<SelectOpts optType="onions" onChange={tmpFn} />);

    t.plan(1);
    t.equal(50, wrapper.instance().props['onChange']());
});
