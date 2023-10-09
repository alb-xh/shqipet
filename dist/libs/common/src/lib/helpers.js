"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvFile = exports.isProduction = exports.delay = exports.randomId = void 0;
const short_unique_id_1 = require("short-unique-id");
const randomId = (length = 10) => new short_unique_id_1.default({ length }).randomUUID();
exports.randomId = randomId;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.delay = delay;
const isProduction = () => [process.env['NODE' + '_ENV'], process.env['NODE_ENV']].includes('production');
exports.isProduction = isProduction;
const getEnvFile = () => (0, exports.isProduction)() ? '.prod.env' : '.dev.env';
exports.getEnvFile = getEnvFile;
//# sourceMappingURL=helpers.js.map