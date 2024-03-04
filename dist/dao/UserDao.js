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
Object.defineProperty(exports, "__esModule", { value: true });
const dbProvider_1 = require("../providers/dbProvider");
const errors_1 = require("../types/errors");
const daoNames_1 = require("../utils/constants/daoNames");
const tableEnum_1 = require("../utils/constants/tableEnum");
const helpers_1 = require("../utils/helpers");
class UserDao {
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, dbProvider_1.query)(`INSERT INTO users(${tableEnum_1.UserField.ID}, ${tableEnum_1.UserField.NAME}, ${tableEnum_1.UserField.PASSWORD}, ${tableEnum_1.UserField.PERMISSION}) VALUES ($1, $2, $3, $4)`, [user.id, user.name, user.password, user.permission]);
            }
            catch (e) {
                throw new errors_1.DaoError('Cannot insert user to database', daoNames_1.USER_DAO, 500, e.message);
            }
        });
    }
    static listStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            const userCount = yield (0, dbProvider_1.query)('SELECT count(*) FROM users', []);
            return { usersCount: userCount[0] };
        });
    }
    static getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, dbProvider_1.query)(`SELECT * FROM users WHERE  ${tableEnum_1.UserField.ID} = $1`, [userId]);
            if (!user[0]) {
                throw new errors_1.DaoError('Wrong id of user', daoNames_1.USER_DAO, 400);
            }
            return user[0];
        });
    }
    static clearAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield (0, dbProvider_1.query)('DELETE FROM users', []);
                }
                catch (e) {
                    reject();
                    throw new errors_1.DaoError('Have problem to clear all users', daoNames_1.USER_DAO, 500, e.message);
                    return;
                }
                resolve();
            }));
        });
    }
    static getUsersByCriterias(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = [];
            const whereQuery = (0, helpers_1.queryWhereGenerator)(request, values);
            const users = yield (0, dbProvider_1.query)(`SELECT * FROM users ${whereQuery.length !== 0 ? `WHERE` : ''} ${whereQuery}`, values);
            return users;
        });
    }
    static updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, dbProvider_1.query)(`UPDATE users SET ${tableEnum_1.UserField.NAME} = $1, ${tableEnum_1.UserField.PASSWORD} = $2, ${tableEnum_1.UserField.PERMISSION} = $3`, [user.name, user.password, user.permission]);
            }
            catch (e) {
                throw new errors_1.DaoError('Have problem to update post at database', daoNames_1.USER_DAO, 500, e.message);
            }
            return;
        });
    }
}
exports.default = UserDao;
