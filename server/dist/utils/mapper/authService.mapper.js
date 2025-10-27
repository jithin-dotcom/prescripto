"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUser = mapUser;
function mapUser(user) {
    const obj = user.toObject();
    return {
        _id: obj._id.toString(),
        name: obj.name,
        email: obj.email,
        role: obj.role,
        photo: obj.photo,
        authProvider: obj.authProvider,
        isBlocked: obj.isBlocked,
        isVerified: obj.isVerified,
        createdAt: obj.createdAt,
    };
}
