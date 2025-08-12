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
exports.ConcernController = void 0;
const concernValidation_schema_1 = require("../../validations/concernValidation.schema");
const statusCode_enum_1 = require("../../constants/statusCode.enum");
const zod_1 = require("zod");
const statusMessage_1 = require("../../constants/statusMessage");
class ConcernController {
    constructor(_concernService) {
        this._concernService = _concernService;
    }
    createConcern(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("enter into consern controller");
                const validateData = concernValidation_schema_1.concernValidationSchema.parse(req.body);
                const data = {
                    appointmentId: validateData.appointmentId,
                    doctorId: validateData.doctorId,
                    doctorName: validateData.doctorName,
                    userId: validateData.userId,
                    title: validateData.title,
                    description: validateData.description,
                };
                // console.log("data : ",data);
                const response = yield this._concernService.createConcern(data);
                if (!response) {
                    res.status(statusCode_enum_1.StatusCode.INTERNAL_SERVER_ERROR).json(statusMessage_1.StatusMessage.INTERNAL_SERVER_ERROR);
                    return;
                }
                res.status(statusCode_enum_1.StatusCode.OK).json(statusMessage_1.StatusMessage.OK);
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({
                        status: "fail",
                        message: "Validation error",
                        errors: error.errors,
                    });
                }
                else {
                    next(error);
                }
            }
        });
    }
    getAllConcerns(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const search = req.query.search || "";
                const status = req.query.status || "all";
                console.log("search : ", search);
                const { data, total, page: currentPage, pages } = yield this._concernService.getAllConcerns(page, limit, search, status);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    status: "success",
                    data,
                    pagination: {
                        total,
                        page: currentPage,
                        pages,
                        limit,
                    },
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({
                        status: "fail",
                        message: error.message,
                    });
                }
                else {
                    next(error);
                }
            }
        });
    }
    getConcernsByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                console.log("entered into controller");
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const search = req.query.search || "";
                const status = req.query.status || "all";
                const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
                if (!id || !role) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: "userId missing" });
                    return;
                }
                console.log("search : ", search);
                const { data, total, page: currentPage, pages } = yield this._concernService.getConcernByUser(id, role, page, limit, search, status);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    status: "success",
                    data,
                    pagination: {
                        total,
                        page: currentPage,
                        pages,
                        limit,
                    },
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({
                        status: "fail",
                        message: error.message,
                    });
                }
                else {
                    next(error);
                }
            }
        });
    }
    updateStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("entered into controller");
                const { id } = req.params;
                const { status } = req.body;
                if (!id || (status !== "resolved" && status !== "rejected")) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json(statusMessage_1.StatusMessage.BAD_REQUEST);
                    return;
                }
                const response = yield this._concernService.changeConcernStatus(id, status);
                if (response) {
                    res.status(statusCode_enum_1.StatusCode.OK).json(response);
                    return;
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ConcernController = ConcernController;
