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
const me_1 = __webpack_require__(7);
const envFilePath = process.env['NODE' + '_ENV'] === 'production' ? '.prod.env' : '.dev.env';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ envFilePath })],
        controllers: [me_1.MeController],
        providers: [me_1.GoogleTokenManagerService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeController = exports.GoogleTokenManagerService = void 0;
var google_token_manager_service_1 = __webpack_require__(8);
Object.defineProperty(exports, "GoogleTokenManagerService", ({ enumerable: true, get: function () { return google_token_manager_service_1.GoogleTokenManagerService; } }));
var controller_1 = __webpack_require__(11);
Object.defineProperty(exports, "MeController", ({ enumerable: true, get: function () { return controller_1.MeController; } }));


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleTokenManagerService = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = tslib_1.__importDefault(__webpack_require__(9));
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(6);
const google_auth_library_1 = __webpack_require__(10);
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
            let avatar;
            if (picture) {
                const { data } = yield axios_1.default.get(picture, { responseType: 'arraybuffer' });
                avatar = Buffer.from(data, 'binary')
                    .toString('base64');
            }
            return {
                name: userName,
                avatar,
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
/* 9 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("google-auth-library");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(3);
const express_1 = __webpack_require__(12);
const config_1 = __webpack_require__(6);
const dto_1 = __webpack_require__(13);
const google_token_manager_service_1 = __webpack_require__(8);
let MeController = class MeController {
    constructor(googleTokenManagerService, configService) {
        this.googleTokenManagerService = googleTokenManagerService;
        this.cookieName = 'me';
        this.cookieOptions = {
            path: '/users',
            httpOnly: true,
            sameSite: true,
        };
        const domain = configService.getOrThrow('DOMAIN');
        this.cookieOptions.domain = domain;
        this.cookieOptions.secure = domain !== 'localhost';
    }
    getMe(req) {
        const cookie = req.cookies[this.cookieName];
        if (!cookie) {
            throw new common_1.ForbiddenException();
        }
        return this.googleTokenManagerService.getUserInfo(cookie);
    }
    createMe(body, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userInfo = yield this.googleTokenManagerService.getUserInfo(body.token);
            res
                .cookie(this.cookieName, body.token, this.cookieOptions)
                .send(userInfo);
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
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateMeDto !== "undefined" && dto_1.CreateMeDto) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
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
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof google_token_manager_service_1.GoogleTokenManagerService !== "undefined" && google_token_manager_service_1.GoogleTokenManagerService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], MeController);
exports.MeController = MeController;


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMeDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(14);
class CreateMeDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsJWT)(),
    tslib_1.__metadata("design:type", String)
], CreateMeDto.prototype, "token", void 0);
exports.CreateMeDto = CreateMeDto;
;


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("class-validator");

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
const config_1 = __webpack_require__(6);
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