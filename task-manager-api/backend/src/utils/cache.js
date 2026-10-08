import NodeCache from 'node-cache';

/**
 * In-Memory Cache Service using node-cache
 *
 * Configuration:
 *  - stdTTL: 60 seconds (standard expiration window)
 *  - checkperiod: 120 seconds (background expired-key garbage collection)
 */
const nodeCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// Telemetry counters for cache performance tracking (Supplementary Problem 2)
const counters = {
  hits: 0,
  misses: 0,
  sets: 0,
  invalidations: 0,
};

export const cache = {
  /**
   * Retrieves an item from cache. Tracks hits/misses.
   * @param {string} key
   * @returns {any|null}
   */
  get: (key) => {
    const value = nodeCache.get(key);
    if (value !== undefined) {
      counters.hits += 1;
      return value;
    }
    counters.misses += 1;
    return null;
  },

  /**
   * Stores an item into cache with standard or custom TTL.
   * @param {string} key
   * @param {any} val
   * @param {number} [ttl]
   * @returns {boolean}
   */
  set: (key, val, ttl) => {
    counters.sets += 1;
    if (ttl !== undefined) {
      return nodeCache.set(key, val, ttl);
    }
    return nodeCache.set(key, val);
  },

  /**
   * Invalidates a specific key from cache.
   * @param {string|string[]} key
   * @returns {number}
   */
  del: (key) => {
    counters.invalidations += 1;
    return nodeCache.del(key);
  },

  /**
   * Invalidates all keys starting with a given prefix.
   * @param {string} prefix
   * @returns {number}
   */
  delPrefix: (prefix) => {
    const keys = nodeCache.keys();
    const matched = keys.filter((k) => k.startsWith(prefix));
    if (matched.length > 0) {
      counters.invalidations += matched.length;
      return nodeCache.del(matched);
    }
    return 0;
  },

  /**
   * Clears the entire cache.
   */
  flush: () => {
    counters.invalidations += nodeCache.keys().length;
    return nodeCache.flushAll();
  },

  /**
   * Returns telemetry metrics (hit/miss counts, ratios, active keys).
   * Used by the debug endpoint.
   */
  getMetrics: () => {
    const total = counters.hits + counters.misses;
    const hitRatio = total > 0 ? `${((counters.hits / total) * 100).toFixed(2)}%` : '0.00%';
    const keys = nodeCache.keys();

    return {
      hits: counters.hits,
      misses: counters.misses,
      sets: counters.sets,
      invalidations: counters.invalidations,
      hitRatio,
      totalRequests: total,
      activeKeysCount: keys.length,
      keys,
      stdTTL: 60,
    };
  },

  /**
   * Direct access to underlying NodeCache instance.
   */
  raw: nodeCache,
};

export default cache;
