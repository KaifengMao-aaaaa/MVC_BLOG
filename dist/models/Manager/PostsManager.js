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
class PostsManagerModel {
    constructor() {
        this.modelName = 'PostManagerModel';
    }
    clearAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield PostDao_1.default.listAllPosts();
            posts.forEach((post) => __awaiter(this, void 0, void 0, function* () {
                const postModel = new PostModel_1.default(post);
                yield postModel.delete();
            }));
            return;
        });
    }
}
exports.default = PostsManagerModel;
