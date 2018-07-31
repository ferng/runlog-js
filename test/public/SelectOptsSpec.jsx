import React from 'react';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import test from 'tape';
import SelectOpts from '../../public/SelectOpts';

Enzyme.configure({ adapter: new Adapter() });

test('SelectOpts returns a select with dropdown options from data given to it or none if no data', (t) => {
  const tests = [
    { options: ['onions', 'carrots', 'cucumber', 'lettuce', 'tomato'], expected: 5 },
    { options: [], expected: 0 },
  ];

  t.plan(tests.length * 2);

  Object.values(tests).forEach((testCase) => {
    const wrapper = Enzyme.shallow(<SelectOpts options={testCase.options} onChange={() => { }} value='yes' id='yes' />);
    t.equal(wrapper.is('select'), true);
    t.equal(wrapper.children().length, testCase.expected);
  });
});


test('SelectOpts returns a select with the onChange function we gave it', (t) => {
  const tmpFn = () =>
    50;
  const wrapper = Enzyme.shallow(<SelectOpts options={[]} onChange={tmpFn} value='yes' id='yes' />);
  t.plan(1);
  t.equal(wrapper.prop('onChange')(), 50);
});


test('SelectOpts returns null if "options" is missing or of the wrong type', (t) => {
  t.plan(2);
  const wrapperNull = Enzyme.shallow(<SelectOpts onChange={() => { }} value='yes' id='yes' />);
  const wrapperType = Enzyme.shallow(<SelectOpts options='yes' onChange={() => { }} value='yes' id='yes' />);
  t.equal(wrapperNull.children().length, 0);
  t.equal(wrapperType.children().length, 0);
});


test('SelectOpts returns null if "onChange" is missing or of the wrong type', (t) => {
  t.plan(2);
  const wrapperNull = Enzyme.shallow(<SelectOpts options={['onions']} value='yes' id='yes' />);
  const wrapperType = Enzyme.shallow(<SelectOpts options={['onions']} onChange='yes' value='yes' id='yes' />);
  t.equal(wrapperNull.children().length, 0);
  t.equal(wrapperType.children().length, 0);
});


test('SelectOpts returns null if "value" is missing or of the wrong type', (t) => {
  t.plan(2);
  const wrapperNull = Enzyme.shallow(<SelectOpts options={['onions']} onChange={() => { }} value={['onions']} id='yes' />);
  const wrapperType = Enzyme.shallow(<SelectOpts options={['onions']} onChange={() => { }} id='yes' />);
  t.equal(wrapperNull.children().length, 0);
  t.equal(wrapperType.children().length, 0);
});
