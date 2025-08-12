"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletRepository = void 0;
const base_repositories_1 = require("./base.repositories");
const wallet_models_1 = require("../../models/wallet/wallet.models");
class WalletRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(wallet_models_1.WalletModel);
    }
}
exports.WalletRepository = WalletRepository;
