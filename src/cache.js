'use strict';

const noop = function() {};

function Cache(options) {
  if (!options) {
    const CachemanMem = require('cacheman-memory');
    this._cache = new CachemanMem(options);
  } else {
    const CachemanRedis = require('cacheman-redis');
    this._cache = new CachemanRedis(options);
  }
}

Cache.prototype.get = function(key, cb = noop) {
  return this._cache.get(key, cb);
};

Cache.prototype.set = function(key, value, ttl, cb = noop) {
  if (ttl === 0) ttl = -1;
  return this._cache.set(key, value, ttl, cb);
};

Cache.prototype.clear = function(cb = noop) {
  return this._cache.clear(cb);
};

module.exports = function(options) {
  return new Cache(options);
};
