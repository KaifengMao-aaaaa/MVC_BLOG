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
const TagModel_1 = __importDefault(require("../Features/TagModel"));
const Analytics_1 = __importDefault(require("./Analytics"));
const Basic_1 = __importDefault(require("./Basic"));
const Security_1 = __importDefault(require("./Security"));
/**
 * The basic model for one post
 */
class PostModel extends Basic_1.default {
    constructor(post) {
        super(post);
        this.postAnalyticsModel = new Analytics_1.default(post);
        this.postSecurityModel = new Security_1.default(post);
        this.tagModel = new TagModel_1.default(post);
    }
    // ===========================================================
    // Getters
    // ===========================================================
    getContent() {
        return this.post.content;
    }
    getId() {
        return this.post.id;
    }
    getTitle() {
        return this.post.title;
    }
    getDescription() {
        return this.post.des;
    }
    getTags() { }
    getAnalyticsModel() {
        return this.postAnalyticsModel;
    }
    getSecurityModel() {
        return this.postSecurityModel;
    }
    getTagModel() {
        return this.tagModel;
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield PostDao_1.default.deletePost([this.post.id]);
            yield this.tagModel.removeTags(yield this.tagModel.getPostTags());
        });
    }
}
exports.default = PostModel;
