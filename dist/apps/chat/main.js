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
const config_1 = __webpack_require__(5);
const geo_1 = __webpack_require__(8);
const geo_map_1 = __webpack_require__(14);
const chat_gateway_1 = __webpack_require__(15);
const message_formatter_1 = __webpack_require__(20);
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, geo_1.GeoModule],
        providers: [geo_map_1.GeoMap, message_formatter_1.MessageFormatter, chat_gateway_1.ChatGateway],
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
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(6), exports);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(7);
const envFilePath = process.env['NODE' + '_ENV'] === 'production' ? '.prod.env' : '.dev.env';
let ConfigModule = class ConfigModule {
};
ConfigModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath })],
        providers: [config_1.ConfigService],
        exports: [config_1.ConfigService],
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(9), exports);
tslib_1.__exportStar(__webpack_require__(10), exports);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeoModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const geo_service_1 = __webpack_require__(10);
let GeoModule = class GeoModule {
};
GeoModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [geo_service_1.GeoService],
        exports: [geo_service_1.GeoService],
    })
], GeoModule);
exports.GeoModule = GeoModule;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeoService = void 0;
const tslib_1 = __webpack_require__(1);
const path_1 = __webpack_require__(11);
const fs_1 = __webpack_require__(12);
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(7);
const geoip2_node_1 = __webpack_require__(13);
let GeoService = class GeoService {
    constructor(configService) {
        const path = configService.getOrThrow('GEO_DB_PATH');
        const fullPath = (0, path_1.join)(process.cwd(), path);
        const file = (0, fs_1.readFileSync)(fullPath);
        this.reader = geoip2_node_1.Reader.openBuffer(file);
    }
    getInfo(ip) {
        var _a, _b;
        const { country, city, location, } = this.reader.city(ip);
        return {
            name: (_a = country === null || country === void 0 ? void 0 : country.names) === null || _a === void 0 ? void 0 : _a.en,
            code: country === null || country === void 0 ? void 0 : country.isoCode,
            city: (_b = city === null || city === void 0 ? void 0 : city.names) === null || _b === void 0 ? void 0 : _b.en,
            lat: location === null || location === void 0 ? void 0 : location.latitude,
            lng: location === null || location === void 0 ? void 0 : location.longitude,
        };
    }
};
GeoService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], GeoService);
exports.GeoService = GeoService;


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("@maxmind/geoip2-node");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeoMap = void 0;
const common_1 = __webpack_require__(4);
(0, common_1.Injectable)();
class GeoMap {
    constructor() {
        this.geoMap = {};
    }
    exists(id) {
        return !!this.geoMap[id];
    }
    get(id) {
        if (!this.exists(id)) {
            throw new common_1.ForbiddenException();
        }
        return Object.assign({}, this.geoMap[id]);
    }
    getAll() {
        return Object.assign({}, this.geoMap);
    }
    add(id, data) {
        this.geoMap[id] = data;
        return this;
    }
    remove(id) {
        if (this.exists(id)) {
            delete this.geoMap[id];
        }
        return this;
    }
}
exports.GeoMap = GeoMap;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatGateway = void 0;
const tslib_1 = __webpack_require__(1);
const websockets_1 = __webpack_require__(16);
const geo_1 = __webpack_require__(8);
const common_1 = __webpack_require__(17);
const config_1 = __webpack_require__(7);
const socket_io_1 = __webpack_require__(19);
const geo_map_1 = __webpack_require__(14);
const message_formatter_1 = __webpack_require__(20);
let ChatGateway = class ChatGateway {
    constructor(geoMap, geoService, messageFormatter, configService) {
        this.geoMap = geoMap;
        this.geoService = geoService;
        this.messageFormatter = messageFormatter;
        this.devIp = '91.82.156.27';
        this.domain = configService.getOrThrow('DOMAIN');
    }
    getIp(client) {
        return this.domain !== 'localhost'
            ? client.handshake.headers['x-real-ip'] || client.handshake.address
            : this.devIp;
    }
    handleConnection(client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ip = this.getIp(client);
            if (!ip) {
                return;
            }
            const geoInfo = this.geoService.getInfo(ip);
            this.server.emit(common_1.ChatEvent.UpdateGeoMap, this.geoMap.add(client.id, geoInfo)
                .getAll());
        });
    }
    handleDisconnect(client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.server.emit(common_1.ChatEvent.UpdateGeoMap, this.geoMap.remove(client.id)
                .getAll());
        });
    }
    handleCreateMessage(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { user, text } = message;
            const formattedText = this.messageFormatter.format(text);
            if (formattedText) {
                this.server.emit(common_1.ChatEvent.BroadcastMessage, { user, text: formattedText });
            }
        });
    }
};
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _e : Object)
], ChatGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(common_1.ChatEvent.CreateMessage),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof common_1.Message !== "undefined" && common_1.Message) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleCreateMessage", null);
ChatGateway = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({ path: '/chat', cors: { origin: '*' } }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof geo_map_1.GeoMap !== "undefined" && geo_map_1.GeoMap) === "function" ? _a : Object, typeof (_b = typeof geo_1.GeoService !== "undefined" && geo_1.GeoService) === "function" ? _b : Object, typeof (_c = typeof message_formatter_1.MessageFormatter !== "undefined" && message_formatter_1.MessageFormatter) === "function" ? _c : Object, typeof (_d = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _d : Object])
], ChatGateway);
exports.ChatGateway = ChatGateway;


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(18), exports);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatEvent = void 0;
var ChatEvent;
(function (ChatEvent) {
    ChatEvent["UpdateGeoMap"] = "update_geo_map";
    ChatEvent["CreateMessage"] = "create_message";
    ChatEvent["BroadcastMessage"] = "broadcast_message";
})(ChatEvent = exports.ChatEvent || (exports.ChatEvent = {}));
;
;
;


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageFormatter = void 0;
const tslib_1 = __webpack_require__(1);
const dompurify_1 = tslib_1.__importDefault(__webpack_require__(21));
const jsdom_1 = __webpack_require__(22);
const marked_1 = __webpack_require__(23);
const window = new jsdom_1.JSDOM('').window;
const { sanitize } = (0, dompurify_1.default)(window);
class MessageFormatter {
    format(text) {
        return marked_1.marked.parseInline(sanitize(text), {
            headerIds: false,
            mangle: false,
            highlight: null,
        });
    }
}
exports.MessageFormatter = MessageFormatter;


/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("dompurify");

/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("jsdom");

/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("marked");

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