const test = require('tape');
const target = require('../../../src/validation/common.js');

test('Valid float expressions', (t) => {
    t.plan(8);
    t.equal(target.isFloatExpr(0), true);
    t.equal(target.isFloatExpr(0.0), true);
    t.equal(target.isFloatExpr(0.1), true);
    t.equal(target.isFloatExpr(8989.678), true);
    t.equal(target.isFloatExpr('0'), true);
    t.equal(target.isFloatExpr('0.0'), true);
    t.equal(target.isFloatExpr('0.1'), true);
    t.equal(target.isFloatExpr('8989.678'), true);
});

test('Float expressions', (t) => {
    const tests = [
        {value: 0, expected: true},
        {value: 0.0, expected: true},
        {value: 0.1, expected: true},
        {value: 8989.678, expected: true},
        {value: '0', expected: true},
        {value: '0.0', expected: true},
        {value: '0.1', expected: true},
        {value: '8989.678', expected: true},
        {value: undefined, expected: false},
        {value: NaN, expected: false},
        {value: '', expected: false},
        {value: ' ', expected: false},
        {value: null, expected: false},
        {value: '2.9.2', expected: false},
        {value: '2.9.x', expected: false},
        {value: '2.x', expected: false},
    ];

    t.plan(tests.length);

    for (let test of tests.values()) {
        t.equal(target.isFloatExpr(test.value), test.expected);
    }
});


test('Time expressions', (t) => {
    const tests = [
        {value: '00:00:00', expected: true},
        {value: '23:00:00', expected: true},
        {value: '00:59:00', expected: true},
        {value: '00:00:59', expected: true},
        {value: '23:59:59', expected: true},
        {value: undefined, expected: false},
        {value: NaN, expected: false},
        {value: '', expected: false},
        {value: ' ', expected: false},
        {value: null, expected: false},
        {value: '22:22:', expected: false},
        {value: '22::22', expected: false},
        {value: ':22:22', expected: false},
        {value: '222:22:22', expected: false},
        {value: '22:222:22', expected: false},
        {value: '22:22:222', expected: false},
        {value: '222::22', expected: false},
        {value: '-1:22:22', expected: false},
        {value: '22:-1:22', expected: false},
        {value: '22:22:-1', expected: false},
        {value: '24:22:22', expected: false},
        {value: '22:60:22', expected: false},
        {value: '22:22:60', expected: false},
    ];

    t.plan(tests.length);

    for (let test of tests.values()) {
        t.equal(target.isTimeExpr24(test.value), test.expected);
    }
});
