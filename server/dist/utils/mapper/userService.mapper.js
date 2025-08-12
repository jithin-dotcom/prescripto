"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTopDoctors = exports.mapTopDoctor = void 0;
const mapTopDoctor = (user, profile) => {
    const userData = user.toObject({
        transform: (doc, ret) => {
            delete ret.updatedAt;
            delete ret.__v;
            return ret;
        },
    });
    const profileData = profile && profile.length > 0 ? profile[0] : null;
    const cleanProfile = profileData
        ? Object.assign(Object.assign({}, profileData), { updatedAt: undefined, __v: undefined }) : null;
    return {
        user: userData,
        profile: cleanProfile,
    };
};
exports.mapTopDoctor = mapTopDoctor;
const mapTopDoctors = (users, profiles) => {
    return users.map((user, index) => (0, exports.mapTopDoctor)(user, profiles[index]));
};
exports.mapTopDoctors = mapTopDoctors;
