"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapWalletDTO = void 0;
const mapWalletDTO = (wallet, history, page, limit, totalCount) => {
    const mappedHistory = history.map((h) => {
        var _a, _b;
        return ({
            appointmentId: (_a = h.appointmentId) === null || _a === void 0 ? void 0 : _a.toString(),
            transactionId: (_b = h.transactionId) === null || _b === void 0 ? void 0 : _b.toString(),
            amount: h.amount,
            type: h.type,
            source: h.source,
            status: h.status,
            createdAt: h.createdAt,
            updatedAt: h.updatedAt,
        });
    });
    return {
        userId: wallet.userId.toString(),
        role: wallet.role,
        balance: wallet.balance,
        expense: wallet.expense || 0,
        history: mappedHistory,
        page,
        totalPages: Math.ceil(totalCount / limit),
        totalTransactions: totalCount,
    };
};
exports.mapWalletDTO = mapWalletDTO;
