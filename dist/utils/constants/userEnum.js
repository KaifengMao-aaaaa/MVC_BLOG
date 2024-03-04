"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_STATUS = exports.USER_PERMISSIONS = void 0;
var USER_PERMISSIONS;
(function (USER_PERMISSIONS) {
    USER_PERMISSIONS["ADMIN"] = "ADMIN";
    USER_PERMISSIONS["CONTRIBUTOR"] = "CONTRIBUTOR";
    USER_PERMISSIONS["VIEWER"] = "VIEWER";
})(USER_PERMISSIONS || (exports.USER_PERMISSIONS = USER_PERMISSIONS = {}));
var USER_STATUS;
(function (USER_STATUS) {
    USER_STATUS["LOGIN"] = "LOGIN";
    USER_STATUS["LOGOUT"] = "LOGOUT";
})(USER_STATUS || (exports.USER_STATUS = USER_STATUS = {}));
