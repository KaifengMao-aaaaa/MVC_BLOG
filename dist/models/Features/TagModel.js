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
const TagDao_1 = __importDefault(require("../../dao/TagDao"));
const errors_1 = require("../../types/errors");
class TagModel {
    constructor(post) {
        this.modelName = 'TagModel';
        this.post = post;
    }
    getPostTags() {
        return __awaiter(this, void 0, void 0, function* () {
            const tags = yield TagDao_1.default.getTagsForPost(this.post.id);
            return tags;
        });
    }
    removeTags(tags) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield TagDao_1.default.deleteTags(this.post.id, tags);
            }
            catch (e) {
                throw new errors_1.ModelError('Cannot remove tags from the post', 'SERVER_ERROR', 500, this.modelName);
            }
        });
    }
    addTags(tags) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tags.length === 0) {
                return;
            }
            const existedTags = yield this.getPostTags();
            try {
                yield TagDao_1.default.insertTags(this.post.id, tags.filter((tag) => !existedTags.includes(tag)));
            }
            catch (e) {
                throw new errors_1.ModelError('Failed to add tag', 'SERVER_ERROR', 500, this.modelName);
            }
        });
    }
}
exports.default = TagModel;
