export const memoize = (fn: any, getKey?: any): any => {
  const cache = new Map();

  return (...args: unknown[]) => {
    const key = getKey ? getKey(...args): args;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const value = fn(...args);
    cache.set(key, value);

    return value;
  }
}

export const memoizeAsync = (fn: any, getKey?: any): any => {
  const cache = new Map();

  return async (...args: unknown[]) => {
    const key = getKey ? getKey(...args): args;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const value = await fn(...args);
    cache.set(key, value);

    return value;
  }
}