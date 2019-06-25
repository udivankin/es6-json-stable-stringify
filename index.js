/**
 * @param {*} obj
 * @param {*} opts
 * @returns {Object}
 */
module.exports = (obj, { cycles = false, space = '', replacer, comparator } = {}) => {
    const colon = space ? ': ' : ':';
    const cmp = comparator && (f => (
      node => (a, b) => f({ key: a, value: node[a] }, { key: b, value: node[b] })
    ))(comparator);
    const seen = new WeakMap();

    const stringify = (parent, key, node, level) => {
      if (replacer) node = replacer.call(parent, key, node);
      if (typeof node === 'string') return JSON.stringify(node);
      if (typeof node === 'number') return isFinite(node) ? `${node}` : 'null';
      if (typeof node === 'boolean') return node === false ? 'false' : 'true';
      if (node === null) return 'null';
      if (node === undefined) return;
      if (typeof node.toJSON === 'function') {
          node = node.toJSON();
          if (typeof node !== 'object') return JSON.stringify(node);
      }

      const indent = space ? `\n${space.repeat(level)}` : '';
  
      if (Array.isArray(node)) {
        return `[${node.reduce((acc, n, i) => (
            acc += `${i ? ',' : ''}${indent}${space}${stringify(node, i, n, level + 1) || 'null'}`
        ), '')}${indent}]`;
      }
  
      if (seen.has(node)) {
        if (!cycles) throw new TypeError('Unable to convert circular structure to JSON');
        return JSON.stringify('__cycle__');
      }
  
      seen.set(node, null);
  
      const out = Object.keys(node)
        .sort(cmp && cmp(node))
        .reduce((acc, k) => {
            const v = stringify(node, k, node[k], level + 1);
            return v
              ? acc += `${acc ? ',' : ''}${indent}${space}${JSON.stringify(k)}${colon}${v}`
              : acc;
        }, '');

      seen.delete(node);
  
      return `{${out}${indent}}`;
    };
  
    return stringify({ '': obj }, '', obj, 0);
  };
