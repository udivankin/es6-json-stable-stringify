# es6-json-stable-stringify

Deterministic `JSON.stringify()` - a faster version of [@substack](https://github.com/substack)'s json-stable-strigify written in ES6. By deterministic we mean stable result for the same source across
different iterations and platforms. The reason why it could be helpful even with modern Node is that by passing 
custom replacer as JSON.stringify argument you still cannot override Object keys iteration order which
will result to
``` json
{"1":1,"2":2,"11":11}
```
instead of 
``` json
{"1":1,"11":11,"2":2}
```

You can also pass a custom comparison and replacer functions and use your favorite indentation 
if you have to pretty print the output.

[![Build Status](https://travis-ci.org/udivankin/es6-json-stable-stringify.svg?branch=master)](https://travis-ci.org/udivankin/es6-json-stable-stringify)
[![Coverage Status](https://coveralls.io/repos/github/udivankin/es6-json-stable-stringify/badge.svg?branch=master)](https://coveralls.io/github/udivankin/es6-json-stable-stringify?branch=master)


## Example

``` js
const stringify = require('es6-json-stable-stringify');
const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
console.log(stringify(obj));
```

output:

``` json
{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}
```

## Methods

``` js
const stringify = require('es6-json-stable-stringify')
const str = stringify(obj)
```

Return a deterministic stringified string `str` from the object `obj`.

## Options

### space

Gives an ability to prettify output. Space is expected to be of string type, default
value is empty string. The most commonly used indentation is two spaces:

``` js
const stringify = require('es6-json-stable-stringify');

const options = { space: '  ' };
const s = stringify(obj, options);

console.log(s);
```

which results in prettified output string:

``` json
{
  "a": 3,
  "b": [
    {
      "x": 4,
      "y": 5,
      "z": 6,
    },
    7
  ],
  "c": 8
}
```

### comparator

If `options` is given, you can supply an `options.comparator` to have a custom comparison
function for object keys. Your function `options.comparator` is called with these
parameters:

``` js
comparator({ key: akey, value: avalue }, { key: bkey, value: bvalue })
```

For example, to sort on the object key names in reverse order you could write:

``` js
const stringify = require('es6-json-stable-stringify');

const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
const options = { comparator: (a, b) => a.key < b.key ? 1 : -1 };
const s = stringify(obj, options);
console.log(s);
```

which results in the output string:

``` json
{"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}
```

Or if you wanted to sort on the object values in reverse order, you could write:

``` js
const stringify = require('es6-json-stable-stringify');

const obj = { d: 6, c: 5, b: [{ z: 3, y: 2, x: 1 }, 9], a: 10 };
const s = stringify(obj, (a, b) => a.value < b.value ? 1 : -1);
console.log(s);
```

which outputs:

``` json
{"d":6,"c":5,"b":[{"z":3,"y":2,"x":1},9],"a":10}
```

### replacer

The replacer parameter is a function `options.replacer(key, value)` that behaves the same as the replacer from the core JSON object.

``` js
const stringify = require('es6-json-stable-stringify');

const obj = { a: { c: 1 }, b: 2, c: 3 };
// Replacer which filters nodes with key equal to 'c'
const replacer = (name, value) => name === 'c' ? undefined : value;
const s = stringify(obj, { ...options, replacer });
console.log(s);
```

which outputs:

``` json
{"a":{},"b":2} 
```

### cycles

Pass `true` in `opts.cycles` to stringify circular property as `__cycle__` - the result will not be a valid JSON string in this case.

TypeError will be thrown in case of circular object without this option.


## Install

With [npm](https://npmjs.org) do:

``` bash
npm install es6-json-stable-stringify
```


## Benchmarks

To run benchmark (requires Node.js 10+):
``` bash
node benchmark
```

Results:
``` bash
fast-json-stable-stringify x 55.21 ops/sec ±2.98% (58 runs sampled)
es6-json-stable-stringify x 63.52 ops/sec ±1.71% (66 runs sampled)
json-stable-stringify x 48.94 ops/sec ±2.46% (64 runs sampled)
fast-stable-stringify x 67.05 ops/sec ±2.17% (68 runs sampled)
faster-stable-stringify x 58.41 ops/sec ±2.37% (61 runs sampled)
The fastest is fast-stable-stringify
```

Although "fast-stable-stringify" is actually slightly faster, it does not support nor 
pretty printed JSON output nor replacer functions.

## License

[MIT](https://github.com/epoberezkin/es6-json-stable-stringify/blob/master/LICENSE)
