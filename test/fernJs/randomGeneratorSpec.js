import test from 'tape';
import {getRandomTime, getRandomNumberInclusive, getRandomAlphaString, getRandomString} from '../../fernJs/randomGenerator.js';
import {isTimeExpr24} from '../../fernJs/validation.js';


test('getRandomTime returns a string that looks a valid unique timestamp when called', (t) => {
    const time1 = getRandomTime();
    const time2 = getRandomTime();

    t.plan(2);
    t.notDeepEqual(time1, time2);
    t.ok(isTimeExpr24(time1));
});


test('getRandomNumberInclusive returns a valid unique number within the given floor/ceiling', (t) => {
    const num1 = getRandomNumberInclusive(10, 15);
    const num2 = getRandomNumberInclusive(10, 15);
    const num3 = getRandomNumberInclusive(3, 5);
    const num4 = getRandomNumberInclusive(0, 34);

    t.plan(7);
    t.notEqual(num1, num2);
    t.ok(Number.isInteger(num1));
    t.ok(num1 > 9);
    t.ok(num1 < 16);
    t.ok(num3 > 2);
    t.ok(num3 < 6);
    t.ok(Number.isInteger(num4));
});


test('getRandomNumberInclusive returns undefined if min is negative or larger than max or either value is undefined or NaN', (t) => {
    const num1 = getRandomNumberInclusive(-1, 22);
    const num2 = getRandomNumberInclusive(34, 22);
    const num3 = getRandomNumberInclusive(undefined, 22);
    const num4 = getRandomNumberInclusive(NaN, 22);
    const num5 = getRandomNumberInclusive(22, undefined);
    const num6 = getRandomNumberInclusive(22, NaN);

    t.plan(6);
    t.equal(num1, undefined);
    t.equal(num2, undefined);
    t.equal(num3, undefined);
    t.equal(num4, undefined);
    t.equal(num5, undefined);
    t.equal(num6, undefined);
});


test('getRandomAlphaString returns a valid unique alphabetic string of the specified length', (t) => {
    const str1 = getRandomAlphaString(7);
    const str2 = getRandomAlphaString(7);
    const str3 = getRandomAlphaString(13);

    const regEx = /^[a-z]*$/;
    t.plan(5);
    t.notEqual(regEx.exec(str1), null);
    t.notEqual(str1, str2);
    t.notEqual(regEx.exec(str3), null);
    t.equal(str1.length, 7);
    t.equal(str3.length, 13);
});


test('getRandomAlphaString returns undefined if len is negative, undefined or NaN', (t) => {
    const str1 = getRandomAlphaString(-1);
    const str2 = getRandomAlphaString(undefined);
    const str3 = getRandomAlphaString(NaN);

    t.plan(3);
    t.equal(str1, undefined);
    t.equal(str2, undefined);
    t.equal(str3, undefined);
});


test('getRandomString returns a valid unique string of the specified length and the specified character set', (t) => {
    const str1 = getRandomString(10, 65, 26);
    const str2 = getRandomString(10, 65, 26);
    const str3 = getRandomString(12, 48, 10);
    const str4 = getRandomString(14, 32, 7);

    const alphaRegEx = /^[A-Z]*$/;
    const numRegEx = /^[0-9]*$/;
    const symbolRegEx = /^[ !"#$%&']*$/;
    t.plan(4);
    t.notEqual(alphaRegEx.exec(str1), null);

    t.notEqual(str1, str2);
    t.notEqual(numRegEx.exec(str3), null);
    t.notEqual(symbolRegEx.exec(str4), null);
});


test('getRandomString returns undefined if any value is negative, undefined or NaN', (t) => {
    const data = [
        {'len': -1, 'rangeStart': 32, 'rangeLen': 7},
        {'len': undefined, 'rangeStart': 32, 'rangeLen': 7},
        {'len': NaN, 'rangeStart': 32, 'rangeLen': 7},
        {'len': 10, 'rangeStart': -1, 'rangeLen': 7},
        {'len': 10, 'rangeStart': undefined, 'rangeLen': 7},
        {'len': 10, 'rangeStart': NaN, 'rangeLen': 7},
        {'len': 10, 'rangeStart': 65, 'rangeLen': -1},
        {'len': 10, 'rangeStart': 65, 'rangeLen': undefined},
        {'len': 10, 'rangeStart': 65, 'rangeLen': NaN},
    ];

    t.plan(9);
    data.map((len, start, size) => {
        t.equal(getRandomString(len, start, size), undefined);
    });
});


