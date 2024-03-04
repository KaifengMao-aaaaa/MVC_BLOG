"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagField = exports.UserField = exports.POST_FEATURES = exports.PostField = void 0;
var PostField;
(function (PostField) {
    PostField["ID"] = "id";
    PostField["TITLE"] = "title";
    PostField["CONTENT"] = "content";
    PostField["AUTHOR"] = "author";
    PostField["DESCRIPTION"] = "des";
    PostField["BANNER"] = "banner";
    PostField["IS_DRAFT"] = "is_draft";
    PostField["PUBLISH_TIME"] = "publish_time";
})(PostField || (exports.PostField = PostField = {}));
var POST_FEATURES;
(function (POST_FEATURES) {
    POST_FEATURES["TAG"] = "tags";
})(POST_FEATURES || (exports.POST_FEATURES = POST_FEATURES = {}));
var UserField;
(function (UserField) {
    UserField["ID"] = "id";
    UserField["NAME"] = "name";
    UserField["PASSWORD"] = "password";
    UserField["PERMISSION"] = "permission";
})(UserField || (exports.UserField = UserField = {}));
var TagField;
(function (TagField) {
    TagField["POST"] = "post_id";
    TagField["TAG"] = "name";
})(TagField || (exports.TagField = TagField = {}));
