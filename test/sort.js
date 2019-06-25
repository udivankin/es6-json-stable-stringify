const test = require('tape');
const stringify = require('..');

const options = { space: '' };

test('custom comparison function', (t) => {
    t.plan(1);
    const obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
    const comparator = (a, b) => a.key < b.key ? 1 : -1;
    const s = stringify(obj, { ...options, comparator });
    t.equal(s, '{"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}');
});

test('sort object keys naturally', (t) => {
  t.plan(1);
  const obj = { "2": 2, "1" :1 , "11" : 11 };
  const s = stringify(obj, options);
  t.equal(s, '{"1":1,"11":11,"2":2}');
});