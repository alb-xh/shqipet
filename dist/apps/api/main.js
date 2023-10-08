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

module.exports = require("helmet");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(8), exports);
tslib_1.__exportStar(__webpack_require__(9), exports);


/***/ }),
/* 8 */
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
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEnvFile = exports.isProduction = exports.delay = exports.randomId = void 0;
const tslib_1 = __webpack_require__(1);
const short_unique_id_1 = tslib_1.__importDefault(__webpack_require__(10));
const randomId = (length = 10) => new short_unique_id_1.default({ length }).randomUUID();
exports.randomId = randomId;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.delay = delay;
const isProduction = () => process.env['NODE' + '_ENV'] === 'production';
exports.isProduction = isProduction;
const getEnvFile = () => (0, exports.isProduction)() ? '.prod.env' : '.dev.env';
exports.getEnvFile = getEnvFile;


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("short-unique-id");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(13);
const db_1 = __webpack_require__(15);
const throttler_1 = __webpack_require__(24);
const controllers_1 = __webpack_require__(25);
const users_service_1 = __webpack_require__(32);
const components_1 = __webpack_require__(33);
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            db_1.DbModule,
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 100,
                }]),
        ],
        providers: [
            users_service_1.UsersService,
            components_1.PasswordHasher,
        ],
        controllers: [
            controllers_1.UsersController,
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(14), exports);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(6);
const common_2 = __webpack_require__(7);
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
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(17);
const lodash_1 = __webpack_require__(18);
const dataSource_1 = __webpack_require__(19);
const entitiesObj = tslib_1.__importStar(__webpack_require__(22));
const entities = Object.values(entitiesObj);
let DbModule = class DbModule {
};
DbModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(Object.assign(Object.assign({}, (0, lodash_1.omit)(dataSource_1.options, ['entities', 'migrations'])), { entities })),
            typeorm_1.TypeOrmModule.forFeature(entities),
        ],
        exports: [typeorm_1.TypeOrmModule]
    })
], DbModule);
exports.DbModule = DbModule;


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.options = void 0;
const tslib_1 = __webpack_require__(1);
const dotenv = tslib_1.__importStar(__webpack_require__(20));
const typeorm_1 = __webpack_require__(21);
const isProduction = process.env.NODE_ENV === 'production';
const envFile = isProduction ? '.prod.env' : '.dev.env';
const entitiesPath = isProduction ? 'dist/libs/db/src/lib/entities/*.entity.js' : 'libs/db/src/lib/entities/*.entity.ts';
const migrationsPath = isProduction ? 'dist/libs/db/src/lib/migrations/*.js' : 'libs/db/src/lib/migrations/*.ts';
dotenv.config({ path: envFile });
exports.options = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [entitiesPath],
    migrations: [migrationsPath],
    migrationsTableName: "migrations",
    synchronize: false,
};
exports["default"] = new typeorm_1.DataSource(exports.options);


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(23), exports);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(21);
let User = class User {
    constructor() {
        this.resetPasswordAttempts = 0;
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 32 }),
    (0, typeorm_1.Index)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "profilePictureUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "bio", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "resetPasswordCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0 }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "resetPasswordAttempts", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "updateAt", void 0);
User = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(26), exports);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const dtos_1 = __webpack_require__(27);
const decorators_1 = __webpack_require__(30);
const users_service_1 = __webpack_require__(32);
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getUserByUsername(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.getUser(username);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePictureUrl: user.profilePictureUrl,
                bio: user.bio,
            };
        });
    }
    createUser(createUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (yield this.usersService.userExists(createUserDto.username)) {
                throw new common_1.ForbiddenException('User already exists');
            }
            yield this.usersService.createUser(createUserDto);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(':username'),
    tslib_1.__param(0, (0, common_1.Param)('username')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersController.prototype, "getUserByUsername", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.UseThrottle)(10, 60),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof dtos_1.CreateUserDto !== "undefined" && dtos_1.CreateUserDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UsersController.prototype, "createUser", null);
UsersController = tslib_1.__decorate([
    (0, common_1.Controller)('users'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(28), exports);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(29);
const swagger_1 = __webpack_require__(11);
class CreateUserDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 50),
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 50),
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 50),
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 32),
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
exports.CreateUserDto = CreateUserDto;


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(31), exports);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UseThrottle = void 0;
const common_1 = __webpack_require__(4);
const throttler_1 = __webpack_require__(24);
const UseThrottle = (limit, ttl) => (0, common_1.applyDecorators)((0, common_1.UseGuards)(throttler_1.ThrottlerGuard), (0, throttler_1.Throttle)({ default: { limit, ttl: ttl * 1000 } }));
exports.UseThrottle = UseThrottle;


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(17);
const common_2 = __webpack_require__(7);
const db_1 = __webpack_require__(15);
const typeorm_2 = __webpack_require__(21);
const components_1 = __webpack_require__(33);
let UsersService = class UsersService {
    constructor(userRepository, passwordHasher, generateId = common_2.randomId) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.generateId = generateId;
    }
    userExists(usernameOrId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return typeof usernameOrId === 'number'
                ? this.userRepository.exist({ where: { id: usernameOrId } })
                : this.userRepository.exist({ where: { username: usernameOrId } });
        });
    }
    getUser(usernameOrId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return typeof usernameOrId === 'number'
                ? this.userRepository.findOneBy({ id: usernameOrId })
                : this.userRepository.findOneBy({ username: usernameOrId });
        });
    }
    createUser(userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { password } = userData, rest = tslib_1.__rest(userData, ["password"]);
            const hashedPassword = yield this.passwordHasher.hash(password);
            const user = this.userRepository.create(Object.assign(Object.assign({}, rest), { password: hashedPassword, resetPasswordCode: this.generateId(6), resetPasswordAttempts: 0 }));
            yield this.userRepository.save(user);
        });
    }
};
UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(db_1.User)),
    tslib_1.__param(2, (0, common_1.Optional)()),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof components_1.PasswordHasher !== "undefined" && components_1.PasswordHasher) === "function" ? _b : Object, Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(34), exports);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordHasher = void 0;
const tslib_1 = __webpack_require__(1);
const bcrypt_1 = __webpack_require__(35);
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(6);
let PasswordHasher = class PasswordHasher {
    constructor(configService, hashAlgo = bcrypt_1.hash) {
        this.hashAlgo = hashAlgo;
        this.salt = configService.getOrThrow('PASSWORD_SALT');
    }
    hash(password) {
        return this.hashAlgo(password, 10);
    }
};
PasswordHasher = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Optional)()),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, Object])
], PasswordHasher);
exports.PasswordHasher = PasswordHasher;


/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("bcrypt");

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
const cookie_parser_1 = tslib_1.__importDefault(__webpack_require__(2));
const helmet_1 = tslib_1.__importDefault(__webpack_require__(3));
const common_1 = __webpack_require__(4);
const core_1 = __webpack_require__(5);
const config_1 = __webpack_require__(6);
const common_2 = __webpack_require__(7);
const swagger_1 = __webpack_require__(11);
const app_module_1 = __webpack_require__(12);
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const configService = app.get(config_1.ConfigService);
        const port = configService.getOrThrow('PORT');
        const prefix = configService.getOrThrow('PREFIX');
        const origin = configService.getOrThrow('DOMAIN');
        app.enableCors({ credentials: true, origin: new RegExp(origin) });
        app.use((0, cookie_parser_1.default)());
        app.use((0, helmet_1.default)());
        // app.use(csurf()); // TODO: investigate in future
        app.setGlobalPrefix(prefix);
        app.useGlobalPipes(new common_1.ValidationPipe());
        if (!(0, common_2.isProduction)()) {
            const config = new swagger_1.DocumentBuilder()
                .setTitle('Shqipet')
                .setDescription(`The shqipet API description`)
                .setVersion('1.0')
                .addTag('shqipet')
                .build();
            const document = swagger_1.SwaggerModule.createDocument(app, config);
            swagger_1.SwaggerModule.setup(prefix, app, document);
        }
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