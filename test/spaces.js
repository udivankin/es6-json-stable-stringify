const test = require('tape');
const stringify = require('..');

test('default indent', (t) => {
  t.plan(1);
  const obj = { c: 1, b: { c: 2 } };
  t.equal(stringify(obj), '{"b":{"c":2},"c":1}');
});

test('no indent', (t) => {
  t.plan(1);
  const options = { space: ''};
  const obj = { c: 1, b: { c: 2 } };
  t.equal(stringify(obj, options), '{"b":{"c":2},"c":1}');
});

test('indent w/two spaces', (t) => {
    t.plan(1);
    const options = { space: '  '};
    const obj = { c: 1, b: { c: 2 } };
    t.equal(stringify(obj, options), '{\n  "b": {\n    "c": 2\n  },\n  "c": 1\n}');
});

test('indent w/one tab', (t) => {
    t.plan(1);
    const options = { space: '\t'};
    const obj = { c: 1, b: { c: 2 } };
    t.equal(stringify(obj, options), '{\n\t"b": {\n\t\t"c": 2\n\t},\n\t"c": 1\n}');
});
