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
class TagDao {
    static getTagsForPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tags = yield (0, dbProvider_1.query)('SELECT * FROM have_tag WHERE post_id = $1', [postId]);
            return tags.map((tag) => tag.name);
        });
    }
    static insertTags(postId, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            const placeHolders = tags.map((tag, index) => {
                return `($${index + 1}, ${postId})`;
            });
            try {
                yield (0, dbProvider_1.query)(`INSERT INTO have_tag (${tableEnum_1.TagField.TAG}, ${tableEnum_1.TagField.POST}) values ${placeHolders.join(',')}`, tags);
            }
            catch (e) {
                throw new errors_1.DaoError('Insert tag failed', daoNames_1.TAG_DAO, 500, e.message);
            }
        });
    }
    static deleteTags(postId, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tags.length === 0) {
                return;
            }
            try {
                yield (0, dbProvider_1.query)(`DELETE FROM have_tag WHERE ${tableEnum_1.TagField.TAG} in (${tags.map((_, index) => `$${index + 1}`).join(',')}) and post_id = $${tags.length + 1}`, [...tags, postId]);
            }
            catch (e) {
                throw new errors_1.DaoError('Delete relatived tags with post failed', daoNames_1.TAG_DAO, 500, e.message);
            }
        });
    }
}
exports.default = TagDao;
