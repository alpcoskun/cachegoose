'use strict';

let hasRun = false;
let cache;

/**
 * @param {object} mongoose mongoose Object
 * @param {object} [cacheOptions] redis config(leave blank for memory caching)
 */
module.exports = function init(mongoose, cacheOptions) {
  if (typeof mongoose.Model.hydrate !== 'function')
    throw new Error(
      'Cachegoose is only compatible with versions of mongoose that implement the `model.hydrate` method'
    );
  if (hasRun) return;
  hasRun = true;

  init._cache = cache = require('./cache')(cacheOptions);

  require('./extend-query')(mongoose, cache);
  require('./extend-aggregate')(mongoose, cache);
};

/**
 * @param {object} mongoose
 * @param {object} [cacheOptions]
 */
module.exports.clearCache = function(cb = function() {}) {
  cache.clear(cb);
};
