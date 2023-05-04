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

module.exports = require("cookie-parser");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(6);
const geo_1 = __webpack_require__(9);
const me_1 = __webpack_require__(15);
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(me_1.IpMiddleware)
            .forRoutes(me_1.MeController);
    }
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, geo_1.GeoModule],
        controllers: [me_1.MeController],
        providers: [me_1.IpMiddleware, me_1.GoogleTokenManagerService, me_1.UsersService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(7), exports);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(8);
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
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(10), exports);
tslib_1.__exportStar(__webpack_require__(11), exports);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeoModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(3);
const geo_service_1 = __webpack_require__(11);
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
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeoService = void 0;
const tslib_1 = __webpack_require__(1);
const path_1 = __webpack_require__(12);
const fs_1 = __webpack_require__(13);
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(8);
const geoip2_node_1 = __webpack_require__(14);
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
/* 12 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@maxmind/geoip2-node");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IpMiddleware = exports.UsersService = exports.MeController = exports.GoogleTokenManagerService = void 0;
var google_token_manager_service_1 = __webpack_require__(16);
Object.defineProperty(exports, "GoogleTokenManagerService", ({ enumerable: true, get: function () { return google_token_manager_service_1.GoogleTokenManagerService; } }));
var controller_1 = __webpack_require__(18);
Object.defineProperty(exports, "MeController", ({ enumerable: true, get: function () { return controller_1.MeController; } }));
var service_1 = __webpack_require__(20);
Object.defineProperty(exports, "UsersService", ({ enumerable: true, get: function () { return service_1.UsersService; } }));
var ip_middleware_1 = __webpack_require__(21);
Object.defineProperty(exports, "IpMiddleware", ({ enumerable: true, get: function () { return ip_middleware_1.IpMiddleware; } }));


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleTokenManagerService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(8);
const google_auth_library_1 = __webpack_require__(17);
let GoogleTokenManagerService = class GoogleTokenManagerService {
    constructor(configService) {
        const clientId = configService.getOrThrow('GOOGLE_CLIENT_ID');
        this.clientId = clientId;
        this.oAuthClient = new google_auth_library_1.OAuth2Client(clientId);
    }
    getUserInfo(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ticket = yield this.oAuthClient.verifyIdToken({
                idToken: token,
                audience: this.clientId
            });
            const { picture, name, given_name, family_name } = ticket.getPayload();
            const userName = name || [given_name, family_name].join(' ');
            if (!userName) {
                throw new common_1.ForbiddenException('User must have a name!');
            }
            return {
                name: userName,
                avatar: picture,
            };
        });
    }
};
GoogleTokenManagerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], GoogleTokenManagerService);
exports.GoogleTokenManagerService = GoogleTokenManagerService;


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("google-auth-library");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeController = void 0;
const tslib_1 = __webpack_require__(1);
const express_1 = __webpack_require__(19);
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(8);
const service_1 = __webpack_require__(20);
let MeController = class MeController {
    constructor(usersService, configService) {
        this.usersService = usersService;
        this.cookieName = 'me';
        this.cookieOptions = {
            path: '/users',
            httpOnly: true,
            sameSite: true,
        };
        const domain = configService.getOrThrow('DOMAIN');
        this.domain = domain;
        this.cookieOptions.domain = domain;
        this.cookieOptions.secure = domain !== 'localhost';
    }
    getMe(req) {
        const ip = req['clientIp'];
        const cookie = req.cookies[this.cookieName];
        if (!ip || !cookie) {
            throw new common_1.ForbiddenException();
        }
        return this.usersService.getUser({ token: cookie, ip });
    }
    createMe(req, res) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ip = req['clientIp'];
            const token = (_a = req.body) === null || _a === void 0 ? void 0 : _a.token;
            if (!ip || !token) {
                throw new common_1.ForbiddenException();
            }
            const meData = yield this.usersService.getUser({ token, ip });
            res
                .cookie(this.cookieName, req.body.token, this.cookieOptions)
                .send(meData);
        });
    }
    removeMe(res) {
        res
            .clearCookie(this.cookieName, this.cookieOptions)
            .send({ ok: true });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MeController.prototype, "getMe", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], MeController.prototype, "createMe", null);
tslib_1.__decorate([
    (0, common_1.Delete)(),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MeController.prototype, "removeMe", null);
MeController = tslib_1.__decorate([
    (0, common_1.Controller)('/me'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof service_1.UsersService !== "undefined" && service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], MeController);
exports.MeController = MeController;


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(3);
const geo_1 = __webpack_require__(9);
const google_token_manager_service_1 = __webpack_require__(16);
let UsersService = class UsersService {
    constructor(googleTokenManagerService, geoService) {
        this.googleTokenManagerService = googleTokenManagerService;
        this.geoService = geoService;
    }
    getUser(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userInfo = yield this.googleTokenManagerService.getUserInfo(data.token);
            const geoInfo = this.geoService.getInfo(data.ip);
            return Object.assign(Object.assign({}, userInfo), { geo: geoInfo });
        });
    }
};
UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof google_token_manager_service_1.GoogleTokenManagerService !== "undefined" && google_token_manager_service_1.GoogleTokenManagerService) === "function" ? _a : Object, typeof (_b = typeof geo_1.GeoService !== "undefined" && geo_1.GeoService) === "function" ? _b : Object])
], UsersService);
exports.UsersService = UsersService;
;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IpMiddleware = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(8);
let IpMiddleware = class IpMiddleware {
    constructor(configService) {
        this.devIp = '91.82.156.27';
        this.domain = configService.getOrThrow('DOMAIN');
    }
    use(req, res, next) {
        const ip = this.domain !== 'localhost'
            ? req.headers['x-real-ip'] || req.socket.remoteAddress
            : this.devIp;
        req['clientIp'] = ip;
        next();
    }
};
IpMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], IpMiddleware);
exports.IpMiddleware = IpMiddleware;


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
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
const cookie_parser_1 = tslib_1.__importDefault(__webpack_require__(2));
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const config_1 = __webpack_require__(8);
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const port = 3000;
        const prefix = 'users';
        const configService = app.get(config_1.ConfigService);
        const origin = configService.getOrThrow('DOMAIN');
        app.enableCors({ credentials: true, origin: new RegExp(origin) });
        app.use((0, cookie_parser_1.default)());
        app.setGlobalPrefix(prefix);
        app.useGlobalPipes(new common_1.ValidationPipe());
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${prefix}`);
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