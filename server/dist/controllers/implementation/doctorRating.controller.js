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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorRatingController = void 0;
const doctorRating_schema_1 = require("../../validations/doctorRating.schema");
const statusCode_enum_1 = require("../../constants/statusCode.enum");
const statusMessage_1 = require("../../constants/statusMessage");
class DoctorRatingController {
    constructor(_doctorRatingService) {
        this._doctorRatingService = _doctorRatingService;
    }
    rateDoctor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { doctorId, appointmentId, rating, review } = req.body;
                if (!doctorId || !appointmentId || !rating || !userId) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json(statusMessage_1.StatusMessage.BAD_REQUEST);
                    return;
                }
                const validate = doctorRating_schema_1.doctorRatingSchema.parse(Object.assign(Object.assign({}, req.body), { userId }));
                const data = {
                    userId: validate.userId,
                    doctorId: validate.doctorId,
                    appointmentId: validate.appointmentId,
                    rating: validate.rating,
                    review: validate.review,
                };
                yield this._doctorRatingService.rateDoctor(data);
                res.status(statusCode_enum_1.StatusCode.OK).json(statusMessage_1.StatusMessage.OK);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getRatingByDoctor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { doctorId } = req.params;
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                if (!doctorId) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json(statusMessage_1.StatusMessage.BAD_REQUEST);
                    return;
                }
                const response = yield this._doctorRatingService.getRatingByDoctor(doctorId, page, limit);
                res.status(statusCode_enum_1.StatusCode.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.DoctorRatingController = DoctorRatingController;
