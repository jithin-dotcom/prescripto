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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_models_1 = require("../../models/user.models");
class UserService {
    constructor(_userRepo, _patientRepo, _doctorRepo) {
        this._userRepo = _userRepo;
        this._patientRepo = _patientRepo;
        this._doctorRepo = _doctorRepo;
    }
    getAllDoctors() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 4, search = "", sort = "createdAt", specialty = "") {
            try {
                const skip = (page - 1) * limit;
                const baseQuery = {
                    role: "doctor",
                    isBlocked: false,
                    isVerified: true,
                    name: { $regex: search, $options: "i" },
                };
                let users = [];
                if (specialty) {
                    const profiles = yield this._doctorRepo.findAll({ specialization: specialty });
                    const userIds = profiles.map((p) => p.doctorId);
                    users = yield this._userRepo.findAll(Object.assign({ _id: { $in: userIds } }, baseQuery));
                }
                else {
                    users = yield this._userRepo.findAll(baseQuery);
                }
                const doctorsWithProfiles = yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
                    const profile = yield this._doctorRepo.findAll({ doctorId: user._id });
                    return Object.assign(Object.assign({}, user.toObject()), { profile });
                })));
                const sortField = sort.startsWith("-") ? sort.slice(1) : sort;
                const sortOrder = sort.startsWith("-") ? "asc" : "desc";
                const sortedDoctors = doctorsWithProfiles.sort((a, b) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                    let valA = 0;
                    let valB = 0;
                    if (sortField === "experience") {
                        valA = (_c = (_b = (_a = a.profile) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.yearOfExperience) !== null && _c !== void 0 ? _c : 0;
                        valB = (_f = (_e = (_d = b.profile) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.yearOfExperience) !== null && _f !== void 0 ? _f : 0;
                    }
                    else if (sortField === "rating") {
                        valA = (_j = (_h = (_g = a.profile) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.averageRating) !== null && _j !== void 0 ? _j : 0;
                        valB = (_m = (_l = (_k = b.profile) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.averageRating) !== null && _m !== void 0 ? _m : 0;
                    }
                    else {
                        valA = (_o = a[sortField]) !== null && _o !== void 0 ? _o : 0;
                        valB = (_p = b[sortField]) !== null && _p !== void 0 ? _p : 0;
                    }
                    return sortOrder === "asc" ? valA - valB : valB - valA;
                });
                const total = sortedDoctors.length;
                const paginated = sortedDoctors.slice(skip, skip + limit);
                return {
                    data: paginated,
                    total,
                    totalPages: Math.ceil(total / limit),
                    page,
                };
            }
            catch (error) {
                console.error("Error in getAllDoctors:", error);
                throw new Error("Failed to fetch paginated doctors");
            }
        });
    }
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userRepo.findById(userId);
                if (!user)
                    return null;
                let profile = null;
                if (user.role === "user") {
                    profile = yield this._patientRepo.findOne({ patientId: userId });
                }
                else if (user.role === "doctor") {
                    profile = yield this._doctorRepo.findOne({ doctorId: userId });
                }
                return {
                    user,
                    profile
                };
            }
            catch (error) {
                console.error(error);
                throw new Error(`Failed to fetch profile`);
            }
        });
    }
    updateUserOrDoctor(userId, userData, profileData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userRepo.findById(userId);
                if (!user)
                    throw new Error("User not found");
                if (userData.password) {
                    const saltRounds = 10;
                    const hashedPassword = yield bcrypt_1.default.hash(userData.password, saltRounds);
                    userData.password = hashedPassword;
                }
                console.log("profileData : ", profileData);
                if (profileData && 'photo' in profileData && profileData.photo) {
                    yield this._userRepo.updateById(userId, { photo: profileData.photo });
                    delete profileData.photo;
                }
                yield this._userRepo.updateById(userId, userData);
                const objectId = new mongoose_1.default.Types.ObjectId(userId);
                if (user.role === "user" && profileData) {
                    const existingProfile = yield this._patientRepo.findByPatientId(objectId);
                    const patientProfileData = Object.assign({}, profileData);
                    if (existingProfile) {
                        yield this._patientRepo.updateByPatientId(objectId, patientProfileData);
                    }
                    else {
                        yield this._patientRepo.create(Object.assign({ patientId: objectId }, patientProfileData));
                    }
                }
                else if (user.role === "doctor" && profileData) {
                    const existingProfile = yield this._doctorRepo.findByDoctorId(objectId);
                    const doctorProfileData = Object.assign({}, profileData);
                    if (existingProfile) {
                        yield this._doctorRepo.updateByDoctorId(objectId, doctorProfileData);
                    }
                    else {
                        yield this._doctorRepo.create(Object.assign({ doctorId: objectId }, doctorProfileData));
                    }
                }
                return `User with ID ${userId} updated successfully`;
            }
            catch (error) {
                console.error("Error in updateUserOrDoctor:", error);
                throw new Error(error instanceof Error && error.message ? error.message : "Something went wrong while updating");
            }
        });
    }
    changePassword(userId, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("entered into change password");
                const user = yield this._userRepo.findById(userId);
                if (!user) {
                    throw new Error("User not found");
                }
                if (!user.password) {
                    throw new Error("Password missing in dataBase");
                }
                const isMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
                if (!isMatch) {
                    throw new Error("oldPassword don't match the password in dataBase");
                }
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                yield this._userRepo.updateById(userId, { password: hashedPassword });
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Something went wrong");
                }
            }
        });
    }
    changeEmail(userId, password, newEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_models_1.UserModel.findById(userId);
                if (!user) {
                    throw new Error("User not found");
                }
                if (!user.password) {
                    throw new Error("Password missing in Database");
                }
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!isMatch) {
                    throw new Error("Password doesn't match");
                }
                const existing = yield this._userRepo.findOne({ email: newEmail });
                if (existing && (existing === null || existing === void 0 ? void 0 : existing._id).toString() !== userId) {
                    throw new Error("Email not available");
                }
                yield this._userRepo.updateById(userId, { email: newEmail });
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Something went wrong");
                }
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new mongoose_1.default.Types.ObjectId(userId);
                const user = yield this._userRepo.findById(id);
                return user;
            }
            catch (error) {
                throw new Error("Failed to get User");
            }
        });
    }
}
exports.UserService = UserService;
