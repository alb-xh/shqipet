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

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(5);
const images_1 = __webpack_require__(8);
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        controllers: [images_1.ImagesController],
        providers: [images_1.ImagesService],
    })
], AppModule);
exports.AppModule = AppModule;


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
const common_1 = __webpack_require__(2);
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
exports.ImagesService = exports.ImagesController = void 0;
var controller_1 = __webpack_require__(9);
Object.defineProperty(exports, "ImagesController", ({ enumerable: true, get: function () { return controller_1.ImagesController; } }));
var service_1 = __webpack_require__(11);
Object.defineProperty(exports, "ImagesService", ({ enumerable: true, get: function () { return service_1.ImagesService; } }));


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImagesController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const express_1 = __webpack_require__(10);
const service_1 = __webpack_require__(11);
const dto_1 = __webpack_require__(16);
let ImagesController = class ImagesController {
    constructor(imageService) {
        this.imageService = imageService;
    }
    createImage(body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { url } = body;
            const name = yield this.imageService.saveByUrl(url);
            return { name };
        });
    }
    getImage(params, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { path } = params;
            const stream = yield this.imageService.readByPath(path);
            stream.pipe(res);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof dto_1.CreateImageDto !== "undefined" && dto_1.CreateImageDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ImagesController.prototype, "createImage", null);
tslib_1.__decorate([
    (0, common_1.Get)(':path'),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof dto_1.GetImageParamsDto !== "undefined" && dto_1.GetImageParamsDto) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ImagesController.prototype, "getImage", null);
ImagesController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof service_1.ImagesService !== "undefined" && service_1.ImagesService) === "function" ? _a : Object])
], ImagesController);
exports.ImagesController = ImagesController;


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImagesService = void 0;
const tslib_1 = __webpack_require__(1);
const fs_1 = tslib_1.__importDefault(__webpack_require__(12));
const promises_1 = __webpack_require__(13);
const axios_1 = tslib_1.__importDefault(__webpack_require__(14));
const path_1 = __webpack_require__(15);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(7);
let ImagesService = class ImagesService {
    constructor(configService) {
        this.imagesDir = configService.getOrThrow('IMAGES_DIR');
        this.domain = configService.getOrThrow('DOMAIN');
    }
    exists(path) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, promises_1.access)(path);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    getPath(name) {
        return (0, path_1.join)(this.imagesDir, name);
    }
    getNameFromPath(path) {
        return path.replace(/\//g, '__');
    }
    getNameFromUrl(url) {
        return this.getNameFromPath(new URL(url).pathname);
    }
    getImageUrl(name) {
        return this.domain !== 'localhost'
            ? `https://${this.domain}/${name}`
            : `http://localhost:4000/${name}`;
    }
    fetchUrl(url) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.get(url, { responseType: 'stream' });
            return data;
        });
    }
    readByName(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const path = this.getPath(name);
            const exists = yield this.exists(path);
            if (!exists) {
                throw new common_1.NotFoundException();
            }
            return fs_1.default.createReadStream(path, { encoding: 'binary' });
        });
    }
    readByPath(path) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.readByName(this.getNameFromPath(path));
        });
    }
    readByUrl(url) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.readByName(this.getNameFromUrl(url));
        });
    }
    saveBySteam(stream, name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const writeStream = fs_1.default.createWriteStream(this.getPath(name), { encoding: 'binary' });
                stream.pipe(writeStream)
                    .on('error', reject)
                    .on('finish', () => resolve(this.getImageUrl(name)));
            });
        });
    }
    saveByUrl(url, name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const filename = name || this.getNameFromUrl(url);
            const stream = yield this.fetchUrl(url);
            const imageUrl = yield this.saveBySteam(stream, filename);
            return imageUrl;
        });
    }
};
ImagesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ImagesService);
exports.ImagesService = ImagesService;


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetImageParamsDto = exports.CreateImageDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(17);
class CreateImageDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsUrl)(),
    tslib_1.__metadata("design:type", String)
], CreateImageDto.prototype, "url", void 0);
exports.CreateImageDto = CreateImageDto;
class GetImageParamsDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], GetImageParamsDto.prototype, "path", void 0);
exports.GetImageParamsDto = GetImageParamsDto;


/***/ }),
/* 17 */
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

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(3);
const app_module_1 = __webpack_require__(4);
const config_1 = __webpack_require__(7);
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const port = 4000;
        const prefix = 'images';
        const configService = app.get(config_1.ConfigService);
        const origin = configService.getOrThrow('DOMAIN');
        app.enableCors({ origin: new RegExp(origin) });
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