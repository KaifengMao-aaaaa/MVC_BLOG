"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryWhereGenerator = exports.formControllerResult = exports.catchModelError = exports.generateRandomId = void 0;
const errors_1 = require("../types/errors");
function generateRandomId() {
    return Number(String(Math.floor(Math.random() * 100000)) + String(Math.floor(Math.random() * 10000)));
}
exports.generateRandomId = generateRandomId;
function catchModelError(error) {
    if (!(error instanceof errors_1.ModelError)) {
        return {
            status: 'SERVER_ERROR',
            code: 500,
            payload: undefined,
            message: 'Bad Happened',
        };
    }
    return {
        status: error.status,
        code: error.statusCode,
        payload: undefined,
        message: error.message,
    };
}
exports.catchModelError = catchModelError;
function formControllerResult(status, message, code, payload) {
    return {
        status,
        message,
        code,
        payload,
    };
}
exports.formControllerResult = formControllerResult;
function queryWhereGenerator(values, correspondingValues) {
    return Object.keys(values).reduce((accumulator, currentKey) => {
        if (values[currentKey] === undefined) {
            return accumulator;
        }
        correspondingValues.push(values[currentKey]);
        if (accumulator === '') {
            return `${currentKey}=$${correspondingValues.length}`;
        }
        return (accumulator += ` And ${currentKey}=$${correspondingValues.length}`);
    }, '');
}
exports.queryWhereGenerator = queryWhereGenerator;
