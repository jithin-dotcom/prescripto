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
exports.ConcernRepository = void 0;
const base_repositories_1 = require("./base.repositories");
const concern_models_1 = require("../../models/concern/concern.models");
class ConcernRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(concern_models_1.ConcernModel);
    }
    getConcerns(skip, limit, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.model
                .find(query)
                .populate("appointmentId userId doctorId")
                .skip(skip)
                .limit(limit)
                .exec();
            return result;
        });
    }
    countConcerns(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.countDocuments(query).exec();
        });
    }
    updateStatusIfPending(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOneAndUpdate({ _id: id, status: "pending" }, { status }, { new: true });
        });
    }
}
exports.ConcernRepository = ConcernRepository;
