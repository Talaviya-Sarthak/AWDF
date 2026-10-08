import { lazy } from 'react';

/**
 * Wraps dynamic import() with a guaranteed minimum delay.
 * Prevents rapid UI flashing/flicker of loading spinners on fast connections
 * while ensuring lazy loading benefits on slower networks.
 *
 * @param {() => Promise<{ default: any }>} importFunc - Dynamic import function
 * @param {number} minDelayMs - Minimum time in milliseconds (defaults to 300ms)
 * @returns {React.LazyExoticComponent<any>}
 */
export const lazyWithMinDelay = (importFunc, minDelayMs = 300) => {
  return lazy(() =>
    Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, minDelayMs)),
    ]).then(([moduleExports]) => moduleExports)
  );
};

export default lazyWithMinDelay;
