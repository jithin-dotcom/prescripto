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
exports.CallLogRepository = void 0;
const base_repositories_1 = require("./base.repositories");
const callLog_models_1 = require("../../models/VideoCall/callLog.models");
class CallLogRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(callLog_models_1.CallLogModel);
    }
    createLog(log) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(log);
        });
    }
}
exports.CallLogRepository = CallLogRepository;
