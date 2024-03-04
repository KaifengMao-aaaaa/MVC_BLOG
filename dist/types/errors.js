"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoError = exports.ModelError = void 0;
class ModelError extends Error {
    constructor(message, status, statusCode, errorModel) {
        super(message);
        this.status = status;
        this.statusCode = statusCode;
        this.errorModel = errorModel;
    }
}
exports.ModelError = ModelError;
class DaoError extends Error {
    constructor(message, errorDao, code, error = '') {
        super(message);
        this.errorDao = errorDao;
        this.error = error;
        this.code = code;
    }
}
exports.DaoError = DaoError;
