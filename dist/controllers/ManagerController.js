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
const UsersManager_1 = __importDefault(require("../models/Manager/UsersManager"));
const PostsManager_1 = __importDefault(require("../models/Manager/PostsManager"));
const helpers_1 = require("../utils/helpers");
class ManagerController {
    constructor() {
        this.usersManager = new UsersManager_1.default();
        this.postsManager = new PostsManager_1.default();
    }
    userRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.usersManager.createUser(req.body.user);
            }
            catch (e) {
                res.json((0, helpers_1.catchModelError)(e)).status(e.code);
                return;
            }
            res.json((0, helpers_1.formControllerResult)('SUCESS', 'Create user sucessfully', 200, ''));
        });
    }
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = yield this.usersManager.searchUsers({ id: req.body.userId });
            try {
                yield userModel[0].login();
            }
            catch (e) {
                res.json((0, helpers_1.catchModelError)(e)).status(e.code);
            }
            res.json((0, helpers_1.formControllerResult)('SUCESS', 'Login Sucessfully', 200, ''));
        });
    }
    userLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = yield this.usersManager.searchUsers({ id: req.body.userId });
            try {
                yield userModel[0].logout();
            }
            catch (e) {
                res.json((0, helpers_1.catchModelError)(e)).status(e.code);
            }
            res.json((0, helpers_1.formControllerResult)('SUCESS', 'Logout', 200, ''));
        });
    }
}
exports.default = ManagerController;
