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
const geo_1 = __webpack_require__(12);
const cache_1 = __webpack_require__(18);
const config_2 = __webpack_require__(7);
const components_1 = __webpack_require__(23);
const handlers_1 = __webpack_require__(32);
const ws_gateway_1 = __webpack_require__(41);
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            geo_1.GeoModule,
            cache_1.CacheModule,
        ],
        providers: [
            {
                provide: components_1.AuthManager,
                useFactory: (configService) => {
                    const cookieName = configService.getOrThrow('COOKIE');
                    return new components_1.AuthManager(cookieName);
                },
                inject: [config_2.ConfigService],
            },
            {
                provide: components_1.IpExtractor,
                useFactory: (configService) => {
                    const domain = configService.getOrThrow('DOMAIN');
                    return new components_1.IpExtractor(domain);
                },
                inject: [config_2.ConfigService],
            },
            {
                provide: components_1.CorsManager,
                useFactory: (configService) => {
                    const domain = configService.getOrThrow('DOMAIN');
                    return new components_1.CorsManager(domain);
                },
                inject: [config_2.ConfigService],
            },
            components_1.MessageFormatter,
            handlers_1.GeoMap,
            handlers_1.GeoHandler,
            handlers_1.RoomMap,
            handlers_1.RoomHandler,
            handlers_1.MessagesHandler,
            ws_gateway_1.WsGateway,
        ],
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
const common_2 = __webpack_require__(8);
let ConfigModule = class ConfigModule {
};
ConfigModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: (0, common_2.getEnvFile)() })],
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
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WsEvent = void 0;
var WsEvent;
(function (WsEvent) {
    WsEvent["UpdateGeoMap"] = "update_geo_map";
    WsEvent["CreateMessage"] = "create_message";
    WsEvent["BroadcastMessage"] = "broadcast_message";
    WsEvent["CreateRoom"] = "create_room";
    WsEvent["CreatedRoom"] = "created_room";
    WsEvent["JoinRoom"] = "join_room";
    WsEvent["UpdateRoom"] = "update_room";
    WsEvent["SendToRoom"] = "send_to_room";
    WsEvent["BroadcastToRoom"] = "broadcast_to_room";
})(WsEvent = exports.WsEvent || (exports.WsEvent = {}));
;
;
;
;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEnvFile = exports.isProduction = exports.delay = exports.randomId = void 0;
const tslib_1 = __webpack_require__(1);
const short_unique_id_1 = tslib_1.__importDefault(__webpack_require__(11));
const randomId = (length = 10) => new short_unique_id_1.default({ length }).randomUUID();
exports.randomId = randomId;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.delay = delay;
const isProduction = () => process.env['NODE' + '_ENV'] === 'production';
exports.isProduction = isProduction;
const getEnvFile = () => (0, exports.isProduction)() ? '.prod.env' : '.dev.env';
exports.getEnvFile = getEnvFile;


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("short-unique-id");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(13), exports);
tslib_1.__exportStar(__webpack_require__(14), exports);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeoModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const geo_service_1 = __webpack_require__(14);
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
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeoService = void 0;
const tslib_1 = __webpack_require__(1);
const path_1 = __webpack_require__(15);
const fs_1 = __webpack_require__(16);
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(7);
const geoip2_node_1 = __webpack_require__(17);
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
/* 15 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("@maxmind/geoip2-node");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const services_1 = __webpack_require__(20);
let CacheModule = class CacheModule {
};
CacheModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [services_1.InMemoryCacheService],
        exports: [services_1.InMemoryCacheService],
    })
], CacheModule);
exports.CacheModule = CacheModule;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(21), exports);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InMemoryCacheService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(22);
let InMemoryCacheService = class InMemoryCacheService {
    constructor() {
        this.map = new Map();
        this.interval = setInterval(() => {
            for (const [key, value] of this.map.entries()) {
                if (this.isExpired(value)) {
                    this.map.delete(key);
                }
            }
        }, 1000 * 60);
    }
    isExpired(entry) {
        const { ttl, createAt } = entry;
        return Date.now() > createAt + ttl;
    }
    set(key, value, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { ttl = constants_1.DEFAULT_TTL } = options || {};
            this.map.set(key, {
                createAt: Date.now(),
                value,
                ttl,
            });
        });
    }
    has(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.map.has(key) && !this.isExpired(this.map.get(key));
        });
    }
    get(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.has(key))) {
                return null;
            }
            const { value } = this.map.get(key);
            return value;
        });
    }
    remove(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.has(key))) {
                return;
            }
            this.map.delete(key);
        });
    }
    getAll(prefix) {
        const result = [];
        for (const [key, entry] of this.map.entries()) {
            if (key.startsWith(prefix) && !this.isExpired(entry)) {
                result.push(entry.value);
            }
        }
        return Promise.resolve(result);
    }
};
InMemoryCacheService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], InMemoryCacheService);
exports.InMemoryCacheService = InMemoryCacheService;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_TTL = void 0;
exports.DEFAULT_TTL = 1000 * 60 * 60;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageFormatter = void 0;
const tslib_1 = __webpack_require__(1);
const dompurify_1 = tslib_1.__importDefault(__webpack_require__(25));
const jsdom_1 = __webpack_require__(26);
const marked_1 = __webpack_require__(27);
const window = new jsdom_1.JSDOM('').window;
const { sanitize } = (0, dompurify_1.default)(window);
class MessageFormatter {
    format(text) {
        return marked_1.marked.parseInline(sanitize(text), {
            headerIds: false,
            mangle: false,
            highlight: null,
            langPrefix: null,
        });
    }
}
exports.MessageFormatter = MessageFormatter;


/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("dompurify");

/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("jsdom");

/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("marked");

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthManager = void 0;
const tslib_1 = __webpack_require__(1);
const cookie_1 = tslib_1.__importDefault(__webpack_require__(29));
const common_1 = __webpack_require__(4);
let AuthManager = class AuthManager {
    constructor(cookieName) {
        this.cookieName = cookieName;
        this.authenticatedClientIds = new Set();
    }
    isAuthenticated(client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.authenticatedClientIds.has(client.id)) {
                return true;
            }
            const token = cookie_1.default.parse(client.handshake.headers.cookie)[this.cookieName];
            // TODO: Validate token
            return !!token;
        });
    }
};
AuthManager = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [String])
], AuthManager);
exports.AuthManager = AuthManager;


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IpExtractor = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
let IpExtractor = class IpExtractor {
    constructor(domain) {
        this.domain = domain;
        this.devIp = '91.82.156.27';
    }
    extract(client) {
        return this.domain !== 'localhost'
            ? client.handshake.headers['x-real-ip'] || client.handshake.address
            : this.devIp;
    }
};
IpExtractor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [String])
], IpExtractor);
exports.IpExtractor = IpExtractor;


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CorsManager = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
let CorsManager = class CorsManager {
    constructor(domain) {
        this.domain = domain;
    }
    apply(cors) {
        cors['credentials'] = true;
        cors['origin'] = new RegExp(this.domain);
    }
};
CorsManager = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [String])
], CorsManager);
exports.CorsManager = CorsManager;
;


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(40), exports);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(34), exports);
tslib_1.__exportStar(__webpack_require__(35), exports);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeoHandler = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const common_2 = __webpack_require__(8);
const geo_1 = __webpack_require__(12);
const components_1 = __webpack_require__(23);
const map_1 = __webpack_require__(35);
let GeoHandler = class GeoHandler {
    constructor(IpExtractor, geoService, geoMap) {
        this.IpExtractor = IpExtractor;
        this.geoService = geoService;
        this.geoMap = geoMap;
    }
    sendUpdatedMap(server) {
        server.emit(common_2.WsEvent.UpdateGeoMap, Array.from(this.geoMap
            .getAll()
            .values()));
    }
    handleConnection(server, client) {
        const ip = this.IpExtractor.extract(client);
        if (!ip) {
            return;
        }
        this.geoMap.set(client.id, this.geoService.getInfo(ip));
        this.sendUpdatedMap(server);
    }
    handleDisconnect(server, client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.geoMap.exists(client.id)) {
                return;
            }
            this.geoMap.remove(client.id);
            this.sendUpdatedMap(server);
        });
    }
};
GeoHandler = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof components_1.IpExtractor !== "undefined" && components_1.IpExtractor) === "function" ? _a : Object, typeof (_b = typeof geo_1.GeoService !== "undefined" && geo_1.GeoService) === "function" ? _b : Object, typeof (_c = typeof map_1.GeoMap !== "undefined" && map_1.GeoMap) === "function" ? _c : Object])
], GeoHandler);
exports.GeoHandler = GeoHandler;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeoMap = void 0;
const common_1 = __webpack_require__(4);
(0, common_1.Injectable)();
class GeoMap {
    constructor() {
        this.geoMap = new Map();
    }
    exists(id) {
        return this.geoMap.has(id);
    }
    get(id) {
        if (!this.exists(id)) {
            return null;
        }
        return this.geoMap.get(id);
    }
    getAll() {
        return this.geoMap;
    }
    set(id, data) {
        this.geoMap.set(id, data);
        return this;
    }
    remove(id) {
        if (this.exists(id)) {
            this.geoMap.delete(id);
        }
        return this;
    }
}
exports.GeoMap = GeoMap;


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomHandler = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const common_2 = __webpack_require__(8);
const components_1 = __webpack_require__(23);
const map_1 = __webpack_require__(38);
const room_1 = __webpack_require__(39);
let RoomHandler = class RoomHandler {
    constructor(authManager, roomMap) {
        this.authManager = authManager;
        this.roomMap = roomMap;
    }
    handleDisconnect(server, client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const room of yield this.roomMap.getAll()) {
                for (const clientId of room.members.keys()) {
                    if (clientId === client.id) {
                        room.removeMember(clientId);
                        server.to(room.id)
                            .emit(common_2.WsEvent.UpdateRoom, room.getInfo());
                    }
                }
            }
        });
    }
    handleCreateRoom(server, client, { id, title, size }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.authManager.isAuthenticated(client))) {
                return;
            }
            this.roomMap.set(new room_1.Room(id, title, size));
        });
    }
    handleJoinRoom(server, client, { id, user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.authManager.isAuthenticated(client))) {
                return;
            }
            const room = yield this.roomMap.get(id);
            if (!room || room.hasMember(client.id)) {
                return;
            }
            room.setMember(client.id, user);
            for (const id of room.members.keys()) {
                server.to(id)
                    .emit(common_2.WsEvent.UpdateRoom, room.getInfo());
            }
        });
    }
    handleSendToRoom(server, client, { id, state }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.authManager.isAuthenticated(client))) {
                return;
            }
            const room = yield this.roomMap.get(id);
            if (!room || !room.hasMember(client.id)) {
                return;
            }
            for (const id of room.members.keys()) {
                server.to(id)
                    .emit(common_2.WsEvent.BroadcastToRoom, state);
            }
        });
    }
};
RoomHandler = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof components_1.AuthManager !== "undefined" && components_1.AuthManager) === "function" ? _a : Object, typeof (_b = typeof map_1.RoomMap !== "undefined" && map_1.RoomMap) === "function" ? _b : Object])
], RoomHandler);
exports.RoomHandler = RoomHandler;


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomMap = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const cache_1 = __webpack_require__(18);
(0, common_1.Injectable)();
let RoomMap = class RoomMap {
    constructor(cache) {
        this.cache = cache;
        this.prefix = 'room:';
        this.ttl = 1000 * 60 * 60;
    }
    idToKey(id) {
        return `${this.prefix}${id}`;
    }
    exists(id) {
        return this.cache.has(this.idToKey(id));
    }
    get(id) {
        return this.cache.get(this.idToKey(id));
    }
    getAll() {
        return this.cache.getAll(this.prefix);
    }
    set(room) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.cache.set(this.idToKey(room.id), room, { ttl: this.ttl });
            return this;
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.cache.remove(this.idToKey(id));
            return this;
        });
    }
};
RoomMap = tslib_1.__decorate([
    tslib_1.__param(0, (0, common_1.Inject)(cache_1.InMemoryCacheService)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cache_1.InMemoryCacheService !== "undefined" && cache_1.InMemoryCacheService) === "function" ? _a : Object])
], RoomMap);
exports.RoomMap = RoomMap;


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Room = void 0;
class Room {
    constructor(id, title, size) {
        this.id = id;
        this.title = title;
        this.size = size;
        this.members = new Map();
    }
    hasMember(id) {
        return this.members.has(id);
    }
    getMember(id) {
        return this.hasMember(id)
            ? this.members.get(id)
            : null;
    }
    setMember(id, user) {
        this.members.set(id, user);
        return this;
    }
    removeMember(id) {
        if (this.hasMember(id)) {
            this.members.delete(id);
        }
        return this;
    }
    getInfo() {
        return {
            id: this.id,
            title: this.title,
            size: this.size,
            members: Array.from(this.members.values()),
        };
    }
}
exports.Room = Room;


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessagesHandler = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const common_2 = __webpack_require__(8);
const components_1 = __webpack_require__(23);
let MessagesHandler = class MessagesHandler {
    constructor(authManager, messageFormatter) {
        this.authManager = authManager;
        this.messageFormatter = messageFormatter;
    }
    handleCreateMessage(server, client, { user, text }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.authManager.isAuthenticated(client))) {
                return;
            }
            const formattedText = this.messageFormatter.format(text);
            if (!formattedText) {
                return;
            }
            server.emit(common_2.WsEvent.BroadcastMessage, { user, text: formattedText });
        });
    }
};
MessagesHandler = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof components_1.AuthManager !== "undefined" && components_1.AuthManager) === "function" ? _a : Object, typeof (_b = typeof components_1.MessageFormatter !== "undefined" && components_1.MessageFormatter) === "function" ? _b : Object])
], MessagesHandler);
exports.MessagesHandler = MessagesHandler;


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WsGateway = void 0;
const tslib_1 = __webpack_require__(1);
const websockets_1 = __webpack_require__(42);
const common_1 = __webpack_require__(8);
const socket_io_1 = __webpack_require__(43);
const components_1 = __webpack_require__(23);
const handlers_1 = __webpack_require__(32);
// We need the reference
const cors = {};
let WsGateway = class WsGateway {
    constructor(geoHandler, roomHandler, messageHandler, corsManager) {
        this.geoHandler = geoHandler;
        this.roomHandler = roomHandler;
        this.messageHandler = messageHandler;
        corsManager.apply(cors);
    }
    handleConnection(client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.geoHandler.handleConnection(this.server, client);
        });
    }
    handleDisconnect(client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this.geoHandler.handleDisconnect(this.server, client).catch(console.error),
                this.roomHandler.handleDisconnect(this.server, client).catch(console.error),
            ]);
        });
    }
    handleCreateMessage(client, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.messageHandler.handleCreateMessage(this.server, client, message);
        });
    }
    handleCreateRoom(client, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.roomHandler.handleCreateRoom(this.server, client, message);
        });
    }
    handleJoinRoom(client, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.roomHandler.handleJoinRoom(this.server, client, message);
        });
    }
    handleSendToRoom(client, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.roomHandler.handleSendToRoom(this.server, client, message);
        });
    }
};
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _e : Object)
], WsGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(common_1.WsEvent.CreateMessage),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _f : Object, typeof (_g = typeof common_1.Message !== "undefined" && common_1.Message) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WsGateway.prototype, "handleCreateMessage", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(common_1.WsEvent.CreateRoom),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _h : Object, typeof (_j = typeof common_1.CreateRoomMessage !== "undefined" && common_1.CreateRoomMessage) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WsGateway.prototype, "handleCreateRoom", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(common_1.WsEvent.JoinRoom),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _k : Object, typeof (_l = typeof common_1.JoinRoomMessage !== "undefined" && common_1.JoinRoomMessage) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WsGateway.prototype, "handleJoinRoom", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(common_1.WsEvent.SendToRoom),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _m : Object, typeof (_o = typeof common_1.SendToRoomMessage !== "undefined" && common_1.SendToRoomMessage) === "function" ? _o : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WsGateway.prototype, "handleSendToRoom", null);
WsGateway = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({ path: '/ws', cors }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof handlers_1.GeoHandler !== "undefined" && handlers_1.GeoHandler) === "function" ? _a : Object, typeof (_b = typeof handlers_1.RoomHandler !== "undefined" && handlers_1.RoomHandler) === "function" ? _b : Object, typeof (_c = typeof handlers_1.MessagesHandler !== "undefined" && handlers_1.MessagesHandler) === "function" ? _c : Object, typeof (_d = typeof components_1.CorsManager !== "undefined" && components_1.CorsManager) === "function" ? _d : Object])
], WsGateway);
exports.WsGateway = WsGateway;


/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 43 */
/***/ ((module) => {

module.exports = require("socket.io");

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
        common_1.Logger.log(`🚀 Application is running on: http://localhost:5000/ws`);
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