'use strict';

const { createHash } = require('crypto');
const stringify = require('fast-safe-stringify');

const jsosort = function(obj) {
  let result = {};
  Object.keys(obj)
    .sort()
    .forEach(function(key) {
      let value = obj[key];
      if (Object.prototype.toString.call(value) === '[object Object]') {
        value = jsosort(value);
      }
      result[key] = value;
    });
  return result;
};

const replacer = function(key, val) {
  return val instanceof RegExp ? String(val) : val;
};

module.exports = function init(obj) {
  return createHash('md5')
    .update(stringify(jsosort(obj), replacer))
    .digest('hex');
};
