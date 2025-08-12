"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDoctorProfiles = mapDoctorProfiles;
function mapDoctorProfiles(data) {
    return data
        .filter((profile) => profile && profile.doctorId)
        .map((profile) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
        return ({
            _id: profile._id.toString(),
            doctorId: {
                _id: ((_b = (_a = profile.doctorId) === null || _a === void 0 ? void 0 : _a._id) !== null && _b !== void 0 ? _b : "").toString(),
                name: (_d = (_c = profile.doctorId) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : "",
                email: (_f = (_e = profile.doctorId) === null || _e === void 0 ? void 0 : _e.email) !== null && _f !== void 0 ? _f : "",
                role: (_h = (_g = profile.doctorId) === null || _g === void 0 ? void 0 : _g.role) !== null && _h !== void 0 ? _h : "doctor",
                isVerified: (_k = (_j = profile.doctorId) === null || _j === void 0 ? void 0 : _j.isVerified) !== null && _k !== void 0 ? _k : false,
                authProvider: (_m = (_l = profile.doctorId) === null || _l === void 0 ? void 0 : _l.authProvider) !== null && _m !== void 0 ? _m : "local",
                isBlocked: (_p = (_o = profile.doctorId) === null || _o === void 0 ? void 0 : _o.isBlocked) !== null && _p !== void 0 ? _p : false,
                createdAt: (((_q = profile.doctorId) === null || _q === void 0 ? void 0 : _q.createdAt) instanceof Date
                    ? profile.doctorId.createdAt.toISOString()
                    : ""),
                photo: (_s = (_r = profile.doctorId) === null || _r === void 0 ? void 0 : _r.photo) !== null && _s !== void 0 ? _s : undefined,
            },
            educationDetails: (_t = profile.educationDetails) !== null && _t !== void 0 ? _t : "",
            specialization: (_u = profile.specialization) !== null && _u !== void 0 ? _u : "",
            registrationNumber: (_v = profile.registrationNumber) !== null && _v !== void 0 ? _v : "",
            registrationYear: (_w = profile.registrationYear) !== null && _w !== void 0 ? _w : "",
            yearOfExperience: (_x = profile.yearOfExperience) !== null && _x !== void 0 ? _x : 0,
            proofDocuments: (_y = profile.proofDocuments) !== null && _y !== void 0 ? _y : [],
            fee: (_z = profile.fee) !== null && _z !== void 0 ? _z : 0,
            about: (_0 = profile.about) !== null && _0 !== void 0 ? _0 : "",
            createdAt: profile.createdAt instanceof Date
                ? profile.createdAt.toISOString()
                : "",
            averageRating: (_1 = profile.averageRating) !== null && _1 !== void 0 ? _1 : 0,
            ratingCount: (_2 = profile.ratingCount) !== null && _2 !== void 0 ? _2 : 0,
            availability: (_3 = profile.availability) !== null && _3 !== void 0 ? _3 : [],
            slotDuration: (_4 = profile.slotDuration) !== null && _4 !== void 0 ? _4 : undefined,
        });
    });
}
