/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const geo_map_service_1 = __webpack_require__(5);
const chat_gateway_1 = __webpack_require__(6);
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [geo_map_service_1.GeoMapService, chat_gateway_1.ChatGateway],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeoMapService = void 0;
const common_1 = __webpack_require__(4);
(0, common_1.Injectable)();
class GeoMapService {
    constructor() {
        this.idMap = new Map();
        this.geoMap = new Map();
        this.defaultGeo = {
            active: 0,
        };
    }
    add(id, geo) {
        if (this.idMap.get(id)) {
            throw new common_1.ForbiddenException();
        }
        this.idMap.set(id, geo);
        const geoEntry = this.geoMap.get(geo) || Object.assign({}, this.defaultGeo);
        geoEntry.active++;
        return Object.assign({}, this.geoMap);
    }
    remove(id) {
        const geo = this.idMap.get(id);
        if (geo) {
            throw new common_1.ForbiddenException();
        }
        const geoEntry = this.geoMap.get(geo);
        if (!geoEntry || geoEntry.active <= 0) {
            throw new common_1.ForbiddenException();
        }
        geoEntry.active--;
        return Object.assign({}, this.geoMap);
    }
}
exports.GeoMapService = GeoMapService;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatGateway = void 0;
const tslib_1 = __webpack_require__(1);
const websockets_1 = __webpack_require__(7);
const socket_io_1 = __webpack_require__(8);
const events_1 = __webpack_require__(9);
const geo_map_service_1 = __webpack_require__(5);
console.log(process.env['DOMAIN']);
let ChatGateway = class ChatGateway {
    constructor(geoMapService) {
        this.geoMapService = geoMapService;
    }
    handleConnection(client, geo) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.server.emit(events_1.Event.GeoMap, this.geoMapService.add(client.id, geo));
        });
    }
    handleDisconnect(client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.server.emit(events_1.Event.GeoMap, this.geoMapService.remove(client.id));
        });
    }
};
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _b : Object)
], ChatGateway.prototype, "server", void 0);
ChatGateway = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({ path: '/chat', cors: { origin: process.env['NODE' + '_ENV']['DOMAIN'] } }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof geo_map_service_1.GeoMapService !== "undefined" && geo_map_service_1.GeoMapService) === "function" ? _a : Object])
], ChatGateway);
exports.ChatGateway = ChatGateway;


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Event = void 0;
var Event;
(function (Event) {
    Event["GeoMap"] = "geo_map";
    Event["Message"] = "message";
})(Event = exports.Event || (exports.Event = {}));
;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        yield app.listen(5000);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:5000/chat`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map