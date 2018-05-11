import React from 'react';
import Enzyme from 'enzyme';
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import test from 'tape';
import SelectOpts from '../../public/SelectOpts.jsx';

Enzyme.configure({ adapter: new Adapter() });

test('SelectOpts returns a select with dropdown options from data given to it or none if no data', (t) => {
  const tests = [
    {options: ['onions', 'carrots', 'cucumber', 'lettuce', 'tomato'], expected: 5},
    {options: [], expected: 0},
  ];

  t.plan(tests.length * 2);
  for (let test of tests.values()) {
    const wrapper = shallow(<SelectOpts options={test.options} onChange={() => { }} value='yes' />);
    t.equal(wrapper.is('select'), true);
    t.equal(wrapper.children().length, test.expected);
  }
});


test('SelectOpts returns a select with the onChange function we gave it', (t) => {
  const tmpFn = () => {
    return 50;
  };
  const wrapper = shallow(<SelectOpts options={[]} onChange={tmpFn} value='yes' />);
  t.plan(1);
  t.equal(wrapper.prop('onChange')(), 50);
});


test('SelectOpts returns null if "options" is missing or of the wrong type', (t) => {
  t.plan(2);
  const wrapperNull = shallow(<SelectOpts onChange={() => { }} value='yes' />);
  const wrapperType = shallow(<SelectOpts options='yes' onChange={() => { }} value='yes' />);
  t.equal(wrapperNull.children().length, 0);
  t.equal(wrapperType.children().length, 0);
});


test('SelectOpts returns null if "onChange" is missing or of the wrong type', (t) => {
    t.plan(2);
    const wrapperNull = shallow(<SelectOpts options={['onions']} value='yes' />);
    const wrapperType = shallow(<SelectOpts options={['onions']} onChange='yes' value='yes' />);
    t.equal(wrapperNull.children().length, 0);
    t.equal(wrapperType.children().length, 0);
});


test('SelectOpts returns null if "value" is missing or of the wrong type', (t) => {
    t.plan(2);
    const wrapperNull = shallow(<SelectOpts options={['onions']} onChange={() => { }} value={['onions']} />);
    const wrapperType = shallow(<SelectOpts options={['onions']} onChange={() => { }} />);
    t.equal(wrapperNull.children().length, 0);
    t.equal(wrapperType.children().length, 0);
});
