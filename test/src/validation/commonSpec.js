const test = require('tape');
const target = require('../../../src/validation/common.js');


test('Valid float expressions', (t) => {
    t.plan(8);
    t.equal(true, target.isFloatExpr(0));
    t.equal(true, target.isFloatExpr(0.0));
    t.equal(true, target.isFloatExpr(0.1));
    t.equal(true, target.isFloatExpr(8989.678));
    t.equal(true, target.isFloatExpr('0'));
    t.equal(true, target.isFloatExpr('0.0'));
    t.equal(true, target.isFloatExpr('0.1'));
    t.equal(true, target.isFloatExpr('8989.678'));
});


test('Invalid float expressions', (t) => {
    t.plan(8);
    t.equal(false, target.isFloatExpr(undefined));
    t.equal(false, target.isFloatExpr(NaN));
    t.equal(false, target.isFloatExpr(''));
    t.equal(false, target.isFloatExpr(' '));
    t.equal(false, target.isFloatExpr(null));
    t.equal(false, target.isFloatExpr('2.9.2'));
    t.equal(false, target.isFloatExpr('2.9.x'));
    t.equal(false, target.isFloatExpr('2.x'));
});


test('Valid time in 24hr ckock expressions', (t) => {
    t.plan(5);
    t.equal(true, target.isTimeExpr24('00:00:00'));
    t.equal(true, target.isTimeExpr24('23:00:00'));
    t.equal(true, target.isTimeExpr24('00:59:00'));
    t.equal(true, target.isTimeExpr24('00:00:59'));
    t.equal(true, target.isTimeExpr24('23:59:59'));
});


test('Invalid Time in 24hr ckock expressions', (t) => {
    t.plan(18);
    t.equal(false, target.isTimeExpr24(undefined));
    t.equal(false, target.isTimeExpr24(NaN));
    t.equal(false, target.isTimeExpr24(''));
    t.equal(false, target.isTimeExpr24(' '));
    t.equal(false, target.isTimeExpr24(null));
    t.equal(false, target.isTimeExpr24('22:22:'));
    t.equal(false, target.isTimeExpr24('22::22'));
    t.equal(false, target.isTimeExpr24(':22:22'));
    t.equal(false, target.isTimeExpr24('222:22:22'));
    t.equal(false, target.isTimeExpr24('22:222:22'));
    t.equal(false, target.isTimeExpr24('22:22:222'));
    t.equal(false, target.isTimeExpr24('222::22'));
    t.equal(false, target.isTimeExpr24('-1:22:22'));
    t.equal(false, target.isTimeExpr24('22:-1:22'));
    t.equal(false, target.isTimeExpr24('22:22:-1'));
    t.equal(false, target.isTimeExpr24('24:22:22'));
    t.equal(false, target.isTimeExpr24('22:60:22'));
    t.equal(false, target.isTimeExpr24('22:22:60'));
});
