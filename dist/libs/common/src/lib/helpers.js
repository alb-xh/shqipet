"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoizeAsync = exports.memoize = void 0;
const tslib_1 = require("tslib");
const memoize = (fn, getKey) => {
    const cache = new Map();
    return (...args) => {
        const key = getKey ? getKey(...args) : args;
        if (cache.has(key)) {
            return cache.get(key);
        }
        const value = fn(...args);
        cache.set(key, value);
        return value;
    };
};
exports.memoize = memoize;
const memoizeAsync = (fn, getKey) => {
    const cache = new Map();
    return (...args) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const key = getKey ? getKey(...args) : args;
        if (cache.has(key)) {
            return cache.get(key);
        }
        const value = yield fn(...args);
        cache.set(key, value);
        return value;
    });
};
exports.memoizeAsync = memoizeAsync;
//# sourceMappingURL=helpers.js.map