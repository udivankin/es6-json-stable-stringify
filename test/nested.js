const test = require('tape');
const stringify = require('..');

const options = { space: '' };

test('nested', (t) => {
    t.plan(1);
    const obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
    t.equal(stringify(obj, options), '{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}');
});

test('cyclic (default)', (t) => {
    t.plan(1);
    const one = { a: 1 };
    const two = { a: 2, one: one };
    one.two = two;
    try {
        stringify(one, options);
    } catch (ex) {
        t.equal(ex.message, 'Unable to convert circular structure to JSON');
    }
});

test('cyclic (specifically allowed)', (t) => {
    t.plan(1);
    const one = { a: 1 };
    const two = { a: 2, one: one };
    one.two = two;
    t.equal(stringify(one, { cycles:true, ...options }), '{"a":1,"two":{"a":2,"one":"__cycle__"}}');
});

test('repeated non-cyclic value', function(t) {
    t.plan(1);
    const one = { x: 1 };
    const two = { a: one, b: one };
    t.equal(stringify(two, options), '{"a":{"x":1},"b":{"x":1}}');
});

test('acyclic but with reused obj-property pointers', (t) => {
    t.plan(1);
    const x = { a: 1 };
    const y = { b: x, c: x };
    t.equal(stringify(y, options), '{"b":{"a":1},"c":{"a":1}}');
});
