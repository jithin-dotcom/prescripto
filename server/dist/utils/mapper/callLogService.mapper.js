"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapWalletHistoryToDTO = mapWalletHistoryToDTO;
function mapWalletHistoryToDTO(history) {
    const { _id, walletId, appointmentId, amount, type, source, status, transactionId, createdAt, } = history;
    return {
        _id: history._id.toString(),
        walletId: walletId.toString(),
        appointmentId: appointmentId.toString(),
        amount,
        type,
        source,
        status,
        transactionId: transactionId === null || transactionId === void 0 ? void 0 : transactionId.toString(),
        createdAt,
    };
}
