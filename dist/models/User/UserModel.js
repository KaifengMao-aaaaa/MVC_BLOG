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
const Analytics_1 = __importDefault(require("./Analytics"));
const Security_1 = __importDefault(require("./Security"));
const Search_1 = __importDefault(require("./Search"));
const helpers_1 = require("../../utils/helpers");
const PostDao_1 = __importDefault(require("../../dao/PostDao"));
const UserDao_1 = __importDefault(require("../../dao/UserDao"));
const userEnum_1 = require("../../utils/constants/userEnum");
const errors_1 = require("../../types/errors");
const PostModel_1 = __importDefault(require("../Post/PostModel"));
const TagModel_1 = __importDefault(require("../Features/TagModel"));
class UserModel {
    constructor(user) {
        this.modelName = 'UserModel';
        this.user = user;
        this.userSearchPostsModel = new Search_1.default(user);
        this.userSecurityModel = new Security_1.default(user);
        this.userAnalyticsModel = new Analytics_1.default(user);
    }
    // ====================================================================
    // Basic functionalities
    // ====================================================================
    publishPost(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSecurityModel = new Security_1.default(this.user);
            if (!(yield userSecurityModel.canWritePost())) {
                throw new errors_1.ModelError('Deny permission', 'UNAUTHOR', 403, this.modelName);
            }
            const post = this.constructPost(request);
            yield PostDao_1.default.createPost(post);
            return new PostModel_1.default(post);
        });
    }
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            let postModel;
            // Check the existence of the post
            try {
                postModel = new PostModel_1.default(yield PostDao_1.default.getOnePost(postId));
            }
            catch (e) {
                throw new errors_1.ModelError('Id of post do not exist', 'PARAMETERS_ERROR', 400, this.modelName);
            }
            // Check whether user have enough permission to edit the post
            if (!(yield postModel.getSecurityModel().isEditAllowed(this.user.id))) {
                throw new errors_1.ModelError('Deny permission', 'UNAUTHOR', 403, this.modelName);
            }
            try {
                yield PostDao_1.default.deletePost([postId]);
            }
            catch (e) {
                throw new errors_1.ModelError('Try it few seconds late', 'SERVER_ERROR', 500, this.modelName);
            }
        });
    }
    savePost(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSecurityModel = new Security_1.default(this.user);
            if (!(yield userSecurityModel.canWritePost())) {
                throw new errors_1.ModelError('Deny permission', 'UNAUTHOR', 403, this.modelName);
            }
            const post = this.constructPost(request);
            yield PostDao_1.default.createPost(post);
            const tagModel = new TagModel_1.default(post);
            yield tagModel.addTags(request.tags ? request.tags : []);
            return new PostModel_1.default(post);
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            this.user.permission = userEnum_1.USER_PERMISSIONS.CONTRIBUTOR;
            yield UserDao_1.default.updateUser(this.user);
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            this.user.permission = userEnum_1.USER_PERMISSIONS.VIEWER;
            yield UserDao_1.default.updateUser(this.user);
        });
    }
    //==============================================================
    // Getters
    //==============================================================
    getSecurityModel() {
        return this.userSecurityModel;
    }
    getSearchModel() {
        return this.userSearchPostsModel;
    }
    getAnalyticsModel() {
        return this.userAnalyticsModel;
    }
    //==============================================================
    // Helpers
    //==============================================================
    constructPost(request) {
        const post = {
            id: (0, helpers_1.generateRandomId)(),
            title: request.title ? request.title : 'title',
            banner: request.banner ? request.banner : '/',
            author: this.user.id,
            des: request.des ? request.des : 'Description',
            content: request.content ? request.content : '...',
            is_draft: false,
            publish_time: new Date(),
        };
        return post;
    }
}
exports.default = UserModel;
