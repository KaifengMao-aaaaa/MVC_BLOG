"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../../dao/UserDao"));
const errors_1 = require("../../types/errors");
const userEnum_1 = require("../../utils/constants/userEnum");
const helpers_1 = require("../../utils/helpers");
const UserModel_1 = __importDefault(require("../User/UserModel"));
/**
 * This model encapsulates the basic actions on all users.
 */
class UsersManagerModel {
    constructor() {
        this.modelName = 'UserManagerModel';
    }
    createUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (!request.name) {
                    reject(new errors_1.ModelError('Need name of user', 'PARAMETERS_ERROR', 400, this.modelName));
                    return;
                }
                else if (!request.password) {
                    reject(new errors_1.ModelError('Need name of user', 'PARAMETERS_ERROR', 400, this.modelName));
                    return;
                }
                else if ((yield this.searchUsers({ name: request.name })).length !== 0) {
                    reject(new errors_1.ModelError('Change a name', 'PARAMETERS_ERROR', 400, this.modelName));
                    return;
                }
                const user = {
                    id: (0, helpers_1.generateRandomId)(),
                    name: request.name,
                    password: request.password,
                    permission: userEnum_1.USER_PERMISSIONS.VIEWER,
                };
                try {
                    yield UserDao_1.default.createUser(user);
                }
                catch (e) {
                    throw new errors_1.ModelError('Register Late ....', 'SERVER_ERROR', 500, this.modelName);
                }
                resolve(new UserModel_1.default(user));
            }));
        });
    }
    searchUsers(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserDao_1.default.getUsersByCriterias(request);
            const userModels = users.map((user) => new UserModel_1.default(user));
            return userModels;
        });
    }
    clearAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return UserDao_1.default.clearAllUsers();
            }
            catch (e) {
                throw new errors_1.ModelError(e.message, 'SERVER_ERROR', 500, this.modelName);
            }
        });
    }
}
exports.default = UsersManagerModel;
