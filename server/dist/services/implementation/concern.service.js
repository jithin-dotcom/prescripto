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
exports.ConcernService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const concernService_mapper_1 = require("../../utils/mapper/concernService.mapper");
class ConcernService {
    constructor(_concernRepo) {
        this._concernRepo = _concernRepo;
    }
    createConcern(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!data.appointmentId || !data.userId || !data.doctorId || !data.title || !data.description) {
                    throw new Error("Data is missing");
                }
                if (data.description.trim().length < 10) {
                    throw new Error("Description should have at least 10 letters");
                }
                const existing = yield this._concernRepo.findOne({ appointmentId: data.appointmentId });
                if (existing) {
                    throw new Error("You have already raised Concern for this appointment");
                }
                yield this._concernRepo.create(data);
                return { success: true };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Something went wrong in creating concern");
                }
            }
        });
    }
    getAllConcerns(page, limit, search, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (page < 1 || limit < 1) {
                    throw new Error("Invalid page or limit value");
                }
                const skip = (page - 1) * limit;
                let query = {};
                if (search) {
                    query.$or = [
                        { "title": { $regex: search, $options: "i" } },
                        { "description": { $regex: search, $options: "i" } },
                        { "doctorName": { $regex: search, $options: "i" } }
                    ];
                }
                if (status && status !== "all") {
                    query.status = status;
                }
                const [data, total] = yield Promise.all([
                    this._concernRepo.getConcerns(skip, limit, query),
                    this._concernRepo.countConcerns(query)
                ]);
                const pages = Math.ceil(total / limit);
                const newData = (0, concernService_mapper_1.mapConcernsClean)(data);
                return { data: newData, total, page, pages };
            }
            catch (error) {
                throw error instanceof Error ? error : new Error("Something went wrong while fetching concerns");
            }
        });
    }
    changeConcernStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const concernId = new mongoose_1.default.Types.ObjectId(id);
                const updatedConcern = yield this._concernRepo.updateStatusIfPending(concernId, status);
                // console.log("updatedConcern : ",updatedConcern);
                if (!updatedConcern) {
                    throw new Error("Failed to update Status");
                }
                return { message: "Status updated Successfully" };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Something went wrong");
                }
            }
        });
    }
    getConcernByUser(id, role, page, limit, search, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (page < 1 || limit < 1) {
                    throw new Error("Invalid page or limit value");
                }
                const skip = (page - 1) * limit;
                const userId = new mongoose_1.default.Types.ObjectId(id);
                const doctorId = new mongoose_1.default.Types.ObjectId(id);
                let query = {};
                if (role === "user") {
                    query = { userId };
                }
                else {
                    query = { doctorId };
                }
                console.log("role : ", role);
                if (search) {
                    query.$or = [
                        { "title": { $regex: search, $options: "i" } },
                        { "description": { $regex: search, $options: "i" } },
                        { "doctorName": { $regex: search, $options: "i" } }
                    ];
                }
                if (status && status !== "all") {
                    query.status = status;
                }
                const [data, total] = yield Promise.all([
                    this._concernRepo.getConcerns(skip, limit, query),
                    this._concernRepo.countConcerns(query)
                ]);
                const pages = Math.ceil(total / limit);
                const newData = (0, concernService_mapper_1.mapConcernsClean)(data);
                return { data: newData, total, page, pages };
            }
            catch (error) {
                throw error instanceof Error ? error : new Error("Something went wrong while fetching concerns");
            }
        });
    }
}
exports.ConcernService = ConcernService;
