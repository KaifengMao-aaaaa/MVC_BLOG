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
const Basic_1 = __importDefault(require("./Basic"));
/**
 * The model to analyze the one user
 */
class UserAnalyticsModel extends Basic_1.default {
    constructor(user) {
        super(user);
    }
    countOwnPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const postsNum = yield PostDao_1.default.getPostsByCriterias({ author: this.user.id });
            return postsNum.length;
        });
    }
}
exports.default = UserAnalyticsModel;
