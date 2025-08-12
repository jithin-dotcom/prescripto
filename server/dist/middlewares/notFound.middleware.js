"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const statusCode_enum_1 = require("../constants/statusCode.enum");
const statusMessage_1 = require("../constants/statusMessage");
const notFound = (req, res, next) => {
    res.status(statusCode_enum_1.StatusCode.NOT_FOUND).json(statusMessage_1.StatusMessage.NOT_FOUND);
};
exports.notFound = notFound;
