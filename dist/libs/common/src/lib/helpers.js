"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.randomId = void 0;
const short_unique_id_1 = require("short-unique-id");
const randomId = (length = 10) => new short_unique_id_1.default({ length }).randomUUID();
exports.randomId = randomId;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.delay = delay;
//# sourceMappingURL=helpers.js.map