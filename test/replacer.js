const test = require('tape');
const stringify = require('..');

const options = { space: '' };

test('use replacer', (t) => {
    t.plan(1);
    const obj = { a: { c: 1 }, b: 2, c: 3 };
    // Replacer which filters nodes with key equal to 'c'
    const replacer = (name, value) => name === 'c' ? undefined : value;
    const s = stringify(obj, { ...options, replacer });
    t.equal(s, '{"a":{},"b":2}');
});