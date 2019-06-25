const stringify = require('..');

let obj, out, options;

// Custom key-based comparator
obj = { c: 8, b: [{ z: 6, y: 5 , x: 4 }, 7], a: 3 };
options = { comparator: (a, b) => a.key < b.key ? 1 : -1 };
out = stringify(obj, options);
console.log('Custom key-based comparator\n', obj, '\n', out, '\n');

// Custom value-based comparator
obj = { d: 6, c: 5, b: [{ z: 3, y: 2, x: 1 }, 9], a: 10 };
options = { comparator: (a, b) => a.value < b.value ? 1 : -1 };
out = stringify(obj, options);
console.log('Custom value-based comparator\n', obj, '\n', out, '\n');

// Nested JSON
obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
out = stringify(obj);
console.log('Nested JSON\n', obj, '\n', out, '\n');

// Prettify output
obj = { d: 6, c: 5, b: [{ z: 3, y: 2, x: 1 }, 9], a: 10 };
options = { space: '  ' };
out = stringify(obj, options);
console.log('Prettify output\n', obj, '\n', out, '\n');

// Use replacer function which filters nodes with key equal to "c"
obj = { a: { c: 1 }, b: 2, c: 3 };
options = { replacer: (name, value) => name === 'c' ? undefined : value };
out = stringify(obj, options);
console.log('Use replacer function which filters nodes with key equal to "c"\n', obj, '\n', out, '\n');