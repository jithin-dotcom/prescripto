"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserToDTO = mapUserToDTO;
function mapUserToDTO(user, profile) {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isBlocked: user.isBlocked,
        authProvider: user.authProvider,
        photo: user.photo,
        profile: profile
            ? profile.map((p) => {
                const _a = p.toObject(), { _id, createdAt, updatedAt, __v } = _a, rest = __rest(_a, ["_id", "createdAt", "updatedAt", "__v"]);
                return Object.assign({ id: _id.toString() }, rest);
            })
            : [],
    };
}
