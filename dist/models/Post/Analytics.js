"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Basic_1 = __importDefault(require("./Basic"));
/**
 * Model to get analytics of one post
 */
class PostAnalyticsModel extends Basic_1.default {
    constructor(post) {
        super(post);
    }
}
exports.default = PostAnalyticsModel;
