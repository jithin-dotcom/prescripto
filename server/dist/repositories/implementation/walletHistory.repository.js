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
exports.WalletHistoryRepository = void 0;
const base_repositories_1 = require("./base.repositories");
const walletHistory_models_1 = require("../../models/walletHistory/walletHistory.models");
class WalletHistoryRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(walletHistory_models_1.WalletHistoryModel);
    }
    findPaginated(walletId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const [transactions, total] = yield Promise.all([
                this.model.find({ walletId })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                this.model.countDocuments({ walletId }),
            ]);
            return [transactions, total];
        });
    }
}
exports.WalletHistoryRepository = WalletHistoryRepository;
