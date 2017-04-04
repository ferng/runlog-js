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


test('Invalid float expressions', (t) => {
    t.plan(8);
    t.equal(target.isFloatExpr(undefined), false);
    t.equal(target.isFloatExpr(NaN), false);
    t.equal(target.isFloatExpr(''), false);
    t.equal(target.isFloatExpr(' '), false);
    t.equal(target.isFloatExpr(null), false);
    t.equal(target.isFloatExpr('2.9.2'), false);
    t.equal(target.isFloatExpr('2.9.x'), false);
    t.equal(target.isFloatExpr('2.x'), false);
});


test('Valid time in 24hr ckock expressions', (t) => {
    t.plan(5);
    t.equal(target.isTimeExpr24('00:00:00'), true);
    t.equal(target.isTimeExpr24('23:00:00'), true);
    t.equal(target.isTimeExpr24('00:59:00'), true);
    t.equal(target.isTimeExpr24('00:00:59'), true);
    t.equal(target.isTimeExpr24('23:59:59'), true);
});


test('Invalid Time in 24hr ckock expressions', (t) => {
    t.plan(18);
    t.equal(target.isTimeExpr24(undefined), false);
    t.equal(target.isTimeExpr24(NaN), false);
    t.equal(target.isTimeExpr24(''), false);
    t.equal(target.isTimeExpr24(' '), false);
    t.equal(target.isTimeExpr24(null), false);
    t.equal(target.isTimeExpr24('22:22:'), false);
    t.equal(target.isTimeExpr24('22::22'), false);
    t.equal(target.isTimeExpr24(':22:22'), false);
    t.equal(target.isTimeExpr24('222:22:22'), false);
    t.equal(target.isTimeExpr24('22:222:22'), false);
    t.equal(target.isTimeExpr24('22:22:222'), false);
    t.equal(target.isTimeExpr24('222::22'), false);
    t.equal(target.isTimeExpr24('-1:22:22'), false);
    t.equal(target.isTimeExpr24('22:-1:22'), false);
    t.equal(target.isTimeExpr24('22:22:-1'), false);
    t.equal(target.isTimeExpr24('24:22:22'), false);
    t.equal(target.isTimeExpr24('22:60:22'), false);
    t.equal(target.isTimeExpr24('22:22:60'), false);
});
