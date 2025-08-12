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
exports.AdminService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const redisClient_1 = __importDefault(require("../../config/redisClient"));
const adminService_mapper_1 = require("../../utils/mapper/adminService.mapper");
class AdminService {
    constructor(_adminRepo, _patientProfileRepo, _doctorProfileRepo) {
        this._adminRepo = _adminRepo;
        this._patientProfileRepo = _patientProfileRepo;
        this._doctorProfileRepo = _doctorProfileRepo;
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._adminRepo.findById(userId);
                let profile = null;
                if (!user)
                    throw new Error("user not found");
                if (user.role === "user") {
                    profile = yield this._patientProfileRepo.findAll({ patientId: userId });
                }
                else if (user.role === "doctor") {
                    profile = yield this._doctorProfileRepo.findAll({ doctorId: userId });
                }
                // console.log({...user.toObject(),profile});
                // return {
                //   ...user.toObject(),
                //   profile
                // }
                return (0, adminService_mapper_1.mapUserToDTO)(user, profile);
            }
            catch (error) {
                throw new Error("Failed in fetching user");
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._adminRepo.findAll();
                let doctorCount = 0;
                let userCount = 0;
                data.forEach((obj) => {
                    if (obj.role === "user")
                        userCount++;
                    else if (obj.role === "doctor")
                        doctorCount++;
                });
                return {
                    userCount,
                    doctorCount
                };
            }
            catch (error) {
                console.error(`Error fetching data:`, error);
                throw new Error(`Failed to fetch data`);
            }
        });
    }
    getAllByRole(role_1) {
        return __awaiter(this, arguments, void 0, function* (role, page = 1, limit = 10, search = "", specialty = "") {
            try {
                const safePage = Math.max(1, page);
                const safeLimit = Math.max(1, limit);
                const skip = (safePage - 1) * safeLimit;
                if (specialty === "") {
                    const [items, totalItems] = yield Promise.all([
                        this._adminRepo.getAllByRole(role, safeLimit, skip, search),
                        this._adminRepo.countByRole(role),
                    ]);
                    const itemsWithProfiles = yield Promise.all(items.map((user) => __awaiter(this, void 0, void 0, function* () {
                        const profile = role === "doctor"
                            ? yield this._doctorProfileRepo.findAll({ doctorId: user._id })
                            : yield this._patientProfileRepo.findAll({ patientId: user._id });
                        // return {
                        //   ...user.toObject(),
                        //   profile,
                        // };
                        return (0, adminService_mapper_1.mapUserToDTO)(user, profile);
                    })));
                    return {
                        items: itemsWithProfiles,
                        currentPage: safePage,
                        totalPages: Math.ceil(totalItems / safeLimit),
                        totalItems,
                    };
                }
                if (role === "doctor" && specialty !== "") {
                    const profiles = yield this._doctorProfileRepo.findAll({ specialization: specialty });
                    const matchedDoctors = yield Promise.all(profiles.map((profile) => __awaiter(this, void 0, void 0, function* () {
                        const user = yield this._adminRepo.findOne({ _id: profile.doctorId });
                        if (!user)
                            return null;
                        const nameMatches = user.name
                            .toLowerCase()
                            .includes(search.trim().toLowerCase());
                        if (!nameMatches)
                            return null;
                        // return {
                        //   ...user.toObject(),
                        //   profile: [profile],
                        // };
                        return (0, adminService_mapper_1.mapUserToDTO)(user, [profile]);
                    })));
                    const filtered = matchedDoctors.filter(Boolean);
                    ;
                    const paginated = filtered.slice(skip, skip + safeLimit);
                    return {
                        items: paginated,
                        currentPage: safePage,
                        totalPages: Math.ceil(filtered.length / safeLimit),
                        totalItems: filtered.length,
                    };
                }
                if (role === "user") {
                    const [items, totalItems] = yield Promise.all([
                        this._adminRepo.getAllByRole(role, safeLimit, skip, search),
                        this._adminRepo.countByRole(role),
                    ]);
                    const itemsWithProfiles = yield Promise.all(items.map((user) => __awaiter(this, void 0, void 0, function* () {
                        const profile = yield this._patientProfileRepo.findAll({ patientId: user._id });
                        // return {
                        //   ...user.toObject(),
                        //   profile,
                        // };
                        return (0, adminService_mapper_1.mapUserToDTO)(user, profile);
                    })));
                    return {
                        items: itemsWithProfiles,
                        currentPage: safePage,
                        totalPages: Math.ceil(totalItems / safeLimit),
                        totalItems,
                    };
                }
                return { items: [], currentPage: 1, totalPages: 0, totalItems: 0 };
            }
            catch (error) {
                console.error(`Error fetching ${role}s:`, error);
                throw new Error(`Failed to fetch ${role}s`);
            }
        });
    }
    createUserOrDoctor(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userData, profileData }) {
            var _b;
            try {
                if (!userData.role || !["user", "doctor"].includes(userData.role)) {
                    throw new Error("Invalid role. Only 'user' or 'doctor' are allowed.");
                }
                if (userData.password) {
                    const saltRounds = 10;
                    const hashedPassword = yield bcrypt_1.default.hash(userData.password, saltRounds);
                    userData.password = hashedPassword;
                }
                const user = yield this._adminRepo.create(userData);
                const userId = user._id;
                if (profileData.photo) {
                    yield this._adminRepo.updateById(userId, { photo: profileData.photo });
                    delete profileData.photo;
                }
                if (userData.role === "user") {
                    yield this._patientProfileRepo.create(Object.assign({ patientId: new mongoose_1.default.Types.ObjectId(userId) }, profileData));
                }
                else if (userData.role === "doctor") {
                    yield this._doctorProfileRepo.create(Object.assign({ doctorId: new mongoose_1.default.Types.ObjectId(userId) }, profileData));
                }
                return {
                    message: `${userData.role} created successfully`,
                    userId,
                };
            }
            catch (error) {
                if (error.code === 11000 && ((_b = error.keyPattern) === null || _b === void 0 ? void 0 : _b.email)) {
                    throw new Error(`User with email ${userData.email} already exists`);
                }
                console.error("Error creating user/doctor:", error);
                throw new Error("Failed to create user/doctor");
            }
        });
    }
    updateUserOrDoctor(userId, userData, profileData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._adminRepo.findById(userId);
            if (!user)
                throw new Error("User not found");
            if (userData.password) {
                const saltRounds = 10;
                const hashedPassword = yield bcrypt_1.default.hash(userData.password, saltRounds);
                userData.password = hashedPassword;
            }
            if (profileData && 'photo' in profileData && profileData.photo) {
                yield this._adminRepo.updateById(userId, { photo: profileData.photo });
                delete profileData.photo;
            }
            yield this._adminRepo.updateById(userId, userData);
            const objectId = new mongoose_1.default.Types.ObjectId(userId);
            if (user.role === "user" && profileData) {
                const existingProfile = yield this._patientProfileRepo.findByPatientId(objectId);
                const patientProfileData = Object.assign({}, profileData);
                if (existingProfile) {
                    yield this._patientProfileRepo.updateByPatientId(objectId, patientProfileData);
                }
                else {
                    yield this._patientProfileRepo.create(Object.assign({ patientId: objectId }, patientProfileData));
                }
            }
            else if (user.role === "doctor" && profileData) {
                const existingProfile = yield this._doctorProfileRepo.findByDoctorId(objectId);
                const doctorProfileData = Object.assign({}, profileData);
                if (existingProfile) {
                    yield this._doctorProfileRepo.updateByDoctorId(objectId, doctorProfileData);
                }
                else {
                    yield this._doctorProfileRepo.create(Object.assign({ doctorId: objectId }, doctorProfileData));
                }
            }
            return `${user.role} updated successfully`;
        });
    }
    deleteUserOrDoctor(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._adminRepo.findById(userId);
                if (!user) {
                    throw new Error("User not found");
                }
                if (user.role === "user") {
                    yield this._patientProfileRepo.deleteByFilter({ patientId: user._id });
                }
                else if (user.role === "doctor") {
                    yield this._doctorProfileRepo.deleteByFilter({ doctorId: user._id });
                }
                yield this._adminRepo.deleteById(userId);
                return {
                    message: `${user.role} deleted successfully`,
                };
            }
            catch (error) {
                console.error("Error deleting user/doctor:", error);
                throw new Error("Failed to delete user/doctor");
            }
        });
    }
    toggleBlockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._adminRepo.findById(userId);
                if (!user)
                    throw new Error("User not found");
                const isBlocked = !user.isBlocked;
                const updatedUser = yield this._adminRepo.updateById(userId, { isBlocked });
                const cacheKey = `user:${userId}:blocked`;
                yield redisClient_1.default.setEx(cacheKey, 3600, isBlocked.toString());
                if (isBlocked) {
                    const refreshTokenKeys = yield redisClient_1.default.keys(`refreshToken:${userId}:*`);
                    if (refreshTokenKeys.length > 0) {
                        for (const key of refreshTokenKeys) {
                            const lookupKey = yield redisClient_1.default.get(key);
                            if (lookupKey) {
                                yield redisClient_1.default.del(`refreshTokenLookup:${lookupKey}`);
                            }
                            yield redisClient_1.default.del(key);
                        }
                    }
                    yield redisClient_1.default.setEx(`blacklist:accessToken:${userId}`, 3600, "true");
                }
                else {
                    yield redisClient_1.default.del(`blacklist:accessToken:${userId}`);
                }
                return {
                    message: `User ${isBlocked ? "blocked" : "unblocked"} successfully`,
                    isBlocked,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    toggleVerifyUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._adminRepo.findById(userId);
                if (!user)
                    throw new Error("user not found");
                const updatedUser = yield this._adminRepo.updateById(userId, { isVerified: !user.isVerified });
                return {
                    message: `User ${(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.isVerified) ? "verified" : "unVerified"} successfully`,
                    isVerified: updatedUser.isVerified,
                };
            }
            catch (error) {
                throw (error);
            }
        });
    }
}
exports.AdminService = AdminService;
