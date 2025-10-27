"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSignupRequestToData = void 0;
const mapSignupRequestToData = (dto, hashedPassword) => ({
    name: dto.name,
    email: dto.email,
    password: hashedPassword,
    role: dto.role,
    isBlocked: false,
});
exports.mapSignupRequestToData = mapSignupRequestToData;
