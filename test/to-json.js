const test = require('tape');
const stringify = require('..');

const options = { space: '' };

test('toJSON function', (t) => {
    t.plan(1);
    const obj = { one: 1, two: 2, toJSON: function() { return { one: 1 }; } };
    t.equal(stringify(obj, options), '{"one":1}' );
});

test('toJSON returns string', (t) => {
    t.plan(1);
    const obj = { one: 1, two: 2, toJSON: function() { return 'one'; } };
    t.equal(stringify(obj, options), '"one"');
});

test('toJSON returns array', (t) => {
    t.plan(1);
    const obj = { one: 1, two: 2, toJSON: function() { return ['one']; } };
    t.equal(stringify(obj, options), '["one"]');
});
