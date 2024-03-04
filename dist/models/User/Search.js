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
const PostDao_1 = __importDefault(require("../../dao/PostDao"));
const PostModel_1 = __importDefault(require("../Post/PostModel"));
const Basic_1 = __importDefault(require("./Basic"));
/**
 * The model for user to search posts in different ways
 */
class UserSearchPostsModel extends Basic_1.default {
    constructor(user) {
        super(user);
    }
    searchPostModels(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield PostDao_1.default.getPostsByCriterias(request);
            return posts.map((post) => new PostModel_1.default(post));
        });
    }
    listPostModels() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield PostDao_1.default.getPostsByCriterias({ author: this.user.id });
            return posts.map((post) => new PostModel_1.default(post));
        });
    }
}
exports.default = UserSearchPostsModel;
