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
class PostDao {
    static getOnePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield (0, dbProvider_1.query)(`SELECT * FROM posts WHERE ${tableEnum_1.PostField.ID} = $1`, [postId]);
            if (!post[0]) {
                throw new errors_1.DaoError('Wrong id of post', daoNames_1.POST_DAO, 400);
            }
            return post[0];
        });
    }
    static createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, dbProvider_1.query)(`INSERT INTO posts(${tableEnum_1.PostField.ID}, ${tableEnum_1.PostField.BANNER},  ${tableEnum_1.PostField.CONTENT}, ${tableEnum_1.PostField.DESCRIPTION}, ${tableEnum_1.PostField.AUTHOR}, ${tableEnum_1.PostField.IS_DRAFT}, ${tableEnum_1.PostField.TITLE}, ${tableEnum_1.PostField.PUBLISH_TIME}) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`, [
                    post.id,
                    post.banner,
                    post.content,
                    post.des,
                    post.author,
                    post.is_draft,
                    post.title,
                    post.publish_time,
                ]);
            }
            catch (e) {
                throw new errors_1.DaoError('Have problem to insert an new post to database', daoNames_1.POST_DAO, 500, e.message);
            }
        });
    }
    static listAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const allPosts = yield (0, dbProvider_1.query)('SELECT * FROM posts', []);
            return allPosts;
        });
    }
    static listStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            const postsCount = yield (0, dbProvider_1.query)('SELECT count(*) FROM posts', []);
            return { postsCount: postsCount[0] };
        });
    }
    static clearAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, dbProvider_1.query)('DELETE FROM posts', []);
            }
            catch (e) {
                throw new errors_1.DaoError('Cannot clear all posts', daoNames_1.POST_DAO, 500, e.message);
            }
            return;
        });
    }
    static getPostsByCriterias(criterias) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = [];
            const whereQuery = (0, helpers_1.queryWhereGenerator)(criterias, values);
            const posts = yield (0, dbProvider_1.query)(`SELECT * FROM posts ${whereQuery.length !== 0 ? 'WHERE' : ''} ${whereQuery}`, values);
            return posts;
        });
    }
    static deletePost(postIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const placeHolders = postIds.map((postId, index) => `id = $${index + 1}`);
            try {
                yield (0, dbProvider_1.query)(`DELETE FROM posts ${placeHolders.length !== 0 ? 'WHERE' : ''} ${placeHolders.join(',')}`, postIds);
            }
            catch (e) {
                throw new errors_1.DaoError('Fail to delete posts', daoNames_1.POST_DAO, 500, e.message);
            }
        });
    }
}
exports.default = PostDao;
