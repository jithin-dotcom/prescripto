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
exports.AppointmentService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const appointmentService_mapper_1 = require("../../utils/mapper/appointmentService.mapper");
class AppointmentService {
    constructor(_appointmentRepo, _doctorRepo, _patientRepo, _userRepo, _chatRepo, _walletRepo, _walletHistoryRepo) {
        this._appointmentRepo = _appointmentRepo;
        this._doctorRepo = _doctorRepo;
        this._patientRepo = _patientRepo;
        this._userRepo = _userRepo;
        this._chatRepo = _chatRepo;
        this._walletRepo = _walletRepo;
        this._walletHistoryRepo = _walletHistoryRepo;
    }
    createAppointment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!data.userId || !data.doctorId || !data.day || !data.time) {
                    throw new Error("Missing required fields");
                }
                const doctorId = data.doctorId instanceof mongoose_1.default.Types.ObjectId
                    ? data.doctorId
                    : new mongoose_1.default.Types.ObjectId(data.doctorId._id);
                const doctor = yield this._doctorRepo.findOne({ doctorId });
                if (!doctor)
                    throw new Error("Doctor not found");
                const patientProfile = yield this._patientRepo.findOne({ patientId: data.userId });
                if (!patientProfile) {
                    throw new Error("Please complete your Profile to Book Appointments");
                }
                if (doctor.fee) {
                    data.fee = doctor.fee;
                }
                data.appointmentNo = Math.floor(100000 + Math.random() * 900000);
                const [dayStr, monthStr, yearStr] = data.day.split("/");
                const selectedDate = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
                const appointmentWeekday = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
                const availabilitySlot = (_a = doctor.availability) === null || _a === void 0 ? void 0 : _a.find((slot) => slot.day === appointmentWeekday);
                if (!availabilitySlot) {
                    throw new Error(`Doctor is not available on ${appointmentWeekday}`);
                }
                const timeToMinutes = (timeStr) => {
                    const [time, period] = timeStr.split(" ");
                    let [hour, minute] = time.split(":").map(Number);
                    if (period === "PM" && hour !== 12)
                        hour += 12;
                    if (period === "AM" && hour === 12)
                        hour = 0;
                    return hour * 60 + minute;
                };
                const bookingMinutes = timeToMinutes(data.time);
                const validSlot = availabilitySlot.slots.some(block => {
                    const fromMinutes = timeToMinutes(block.from);
                    const toMinutes = timeToMinutes(block.to);
                    return bookingMinutes >= fromMinutes && bookingMinutes < toMinutes;
                });
                if (!validSlot) {
                    throw new Error(`Doctor is not available at ${data.time} on ${appointmentWeekday}`);
                }
                const existingAppointments = yield this._appointmentRepo.findAll({ doctorId });
                const isSlotTaken = existingAppointments.some(app => {
                    if (app.status !== "cancelled") {
                        return app.day === data.day && app.time === data.time;
                    }
                });
                if (isSlotTaken) {
                    throw new Error("Slot not available for the selected date and time");
                }
                const appointmentData = Object.assign(Object.assign({}, data), { userId: new mongoose_1.default.Types.ObjectId(data.userId), doctorId, status: "pending", payment: "not paid" });
                yield this._appointmentRepo.create(appointmentData);
                return { message: "successfully created" };
            }
            catch (error) {
                console.error("Error creating appointment:", error);
                if (error instanceof Error)
                    throw error;
                throw new Error("Failed to create appointment");
            }
        });
    }
    getAppointmentsByUser(userId, page, limit, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * limit;
                const filter = { userId: new mongoose_1.default.Types.ObjectId(userId) };
                if (status) {
                    filter.status = status;
                }
                const totalDocs = yield this._appointmentRepo.countAllFiltered(filter);
                const appointments = yield this._appointmentRepo.findUserFilteredPaginated(skip, limit, filter);
                const responses = [];
                for (const appointment of appointments) {
                    const doctorUser = appointment.doctorId;
                    if (!doctorUser || !doctorUser._id)
                        continue;
                    const profile = yield this._doctorRepo.findOne({
                        doctorId: doctorUser._id,
                    });
                    if (!profile)
                        continue;
                    const mapped = (0, appointmentService_mapper_1.mapAppointmentToDTO)(appointment, doctorUser, profile);
                    responses.push(mapped);
                }
                return {
                    data: responses,
                    totalDocs,
                    totalPages: Math.ceil(totalDocs / limit),
                    page,
                    limit,
                };
            }
            catch (error) {
                console.error("Error fetching user appointments:", error);
                throw new Error("Failed to fetch user appointments");
            }
        });
    }
    getCreateAppointment(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const responses = [];
                const timeArray = {};
                const doctorObjectId = new mongoose_1.default.Types.ObjectId(doctorId);
                const doctorUser = yield this._userRepo.findById(doctorObjectId);
                if (!doctorUser)
                    return { responses: [], timeArray: {} };
                const profile = yield this._doctorRepo.findOne({ doctorId: doctorObjectId });
                if (!profile) {
                    return {
                        responses: [
                            {
                                _id: "",
                                doctor: {
                                    _id: doctorUser._id.toString(),
                                    name: doctorUser.name,
                                    email: doctorUser.email,
                                    photo: doctorUser.photo,
                                    isVerified: doctorUser.isVerified,
                                    isBlocked: doctorUser.isBlocked,
                                    educationDetails: "",
                                    specialization: "",
                                    yearOfExperience: 0,
                                    averageRating: 0,
                                    ratingCount: 0,
                                    about: "",
                                    fee: 0,
                                    availability: [],
                                    slotDuration: 30,
                                },
                                userId: "",
                                date: "",
                                time: "",
                                appointmentNo: 0,
                                status: "pending",
                                transactionId: "",
                            },
                        ],
                        timeArray: {},
                    };
                }
                const doctorData = {
                    _id: doctorUser._id.toString(),
                    name: doctorUser.name,
                    email: doctorUser.email,
                    photo: doctorUser.photo,
                    isVerified: doctorUser.isVerified,
                    isBlocked: doctorUser.isBlocked,
                    educationDetails: profile.educationDetails || "",
                    specialization: profile.specialization || "",
                    averageRating: profile.averageRating || 0,
                    ratingCount: profile.ratingCount || 0,
                    yearOfExperience: profile.yearOfExperience || 0,
                    about: profile.about || "",
                    fee: profile.fee || 0,
                    availability: profile.availability || [],
                    slotDuration: profile.slotDuration || 30,
                };
                const appointments = yield this._appointmentRepo.findDoctor(doctorObjectId);
                if (!appointments || appointments.length === 0) {
                    responses.push({
                        _id: "",
                        doctor: doctorData,
                        userId: "",
                        date: "",
                        time: "",
                        appointmentNo: 0,
                        status: "pending",
                        transactionId: "",
                    });
                    return { responses, timeArray: {} };
                }
                for (const appointment of appointments) {
                    const date = appointment.day;
                    const time = appointment.time;
                    if (!timeArray[date]) {
                        timeArray[date] = [];
                    }
                    if (appointment.status !== "cancelled") {
                        timeArray[date].push(time);
                    }
                    responses.push({
                        _id: appointment._id.toString(),
                        doctor: doctorData,
                        userId: appointment.userId.toString(),
                        date,
                        time,
                        appointmentNo: appointment.appointmentNo || 0,
                        status: appointment.status,
                        transactionId: ((_a = appointment.transactionId) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                    });
                }
                return { responses, timeArray };
            }
            catch (error) {
                console.error("Error in getCreateAppointment:", error);
                return { responses: [], timeArray: {} };
            }
        });
    }
    getAppointmentsByDoctor(doctorId, page, limit, status) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const skip = (page - 1) * limit;
                const filter = { doctorId: new mongoose_1.default.Types.ObjectId(doctorId) };
                if (status) {
                    filter.status = status;
                }
                const totalDocs = yield this._appointmentRepo.countAllFiltered(filter);
                const appointments = yield this._appointmentRepo.findDoctorFilteredPaginated(skip, limit, filter);
                const responses = [];
                for (const appointment of appointments) {
                    const user = appointment.userId;
                    if (!user || !user._id)
                        continue;
                    const patientProfile = yield this._patientRepo.findOne({ patientId: user._id });
                    const doctorProfile = yield this._doctorRepo.findOne({ doctorId });
                    if (!doctorProfile)
                        throw new Error("Doctor profile missing");
                    responses.push({
                        _id: appointment._id.toString(),
                        doctorId: appointment.doctorId.toString(),
                        user: {
                            _id: user._id.toString(),
                            name: user.name,
                            email: user.email,
                            photo: user.photo,
                            isVerified: user.isVerified,
                            isBlocked: user.isBlocked,
                            dateOfBirth: patientProfile === null || patientProfile === void 0 ? void 0 : patientProfile.dateOfBirth,
                            gender: patientProfile === null || patientProfile === void 0 ? void 0 : patientProfile.gender,
                            houseName: patientProfile === null || patientProfile === void 0 ? void 0 : patientProfile.houseName,
                            city: patientProfile === null || patientProfile === void 0 ? void 0 : patientProfile.city,
                            state: patientProfile === null || patientProfile === void 0 ? void 0 : patientProfile.state,
                            country: patientProfile === null || patientProfile === void 0 ? void 0 : patientProfile.country,
                            pin: patientProfile === null || patientProfile === void 0 ? void 0 : patientProfile.pin,
                        },
                        fee: appointment.fee || doctorProfile.fee,
                        date: appointment.day,
                        time: appointment.time,
                        appointmentNo: appointment.appointmentNo || 0,
                        status: appointment.status,
                        payment: appointment.payment,
                        transactionId: (_a = appointment.transactionId) === null || _a === void 0 ? void 0 : _a.toString(),
                    });
                }
                return {
                    data: responses,
                    totalDocs,
                    totalPages: Math.ceil(totalDocs / limit),
                    page,
                    limit,
                };
            }
            catch (error) {
                console.error("Error in getAppointmentsByDoctor:", error);
                throw new Error("Failed to fetch appointments for doctor");
            }
        });
    }
    getAllAppointments(page, limit, status) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const skip = (page - 1) * limit;
                const filter = {};
                if (status) {
                    filter.status = status;
                }
                const totalDocs = yield this._appointmentRepo.countAllFiltered(filter);
                const appointments = yield this._appointmentRepo.findAllPopulatedPaginatedFiltered(skip, limit, filter);
                const responses = [];
                const timeArray = [];
                for (const appointment of appointments) {
                    const doctorUser = appointment.doctorId;
                    const patientUser = appointment.userId;
                    timeArray.push(appointment.time);
                    if (!(doctorUser === null || doctorUser === void 0 ? void 0 : doctorUser._id) || !(patientUser === null || patientUser === void 0 ? void 0 : patientUser._id))
                        continue;
                    const doctorProfile = yield this._doctorRepo.findOne({ doctorId: doctorUser._id });
                    const patientProfile = yield this._patientRepo.findOne({ patientId: patientUser._id });
                    if (!doctorProfile)
                        continue;
                    responses.push({
                        _id: appointment._id.toString(),
                        date: appointment.day,
                        time: appointment.time,
                        status: appointment.status,
                        payment: appointment.payment,
                        appointmentNo: appointment.appointmentNo || 0,
                        transactionId: (_a = appointment.transactionId) === null || _a === void 0 ? void 0 : _a.toString(),
                        timeArray,
                        doctor: {
                            _id: doctorUser._id.toString(),
                            name: doctorUser.name,
                            email: doctorUser.email,
                            photo: doctorUser.photo,
                            isVerified: doctorUser.isVerified,
                            isBlocked: doctorUser.isBlocked,
                            educationDetails: doctorProfile.educationDetails,
                            specialization: doctorProfile.specialization || "",
                            yearOfExperience: doctorProfile.yearOfExperience || 0,
                            fee: doctorProfile.fee || 0,
                        },
                        user: {
                            _id: patientUser._id.toString(),
                            name: patientUser.name,
                            email: patientUser.email,
                            photo: patientUser.photo,
                            isVerified: patientUser.isVerified,
                            isBlocked: patientUser.isBlocked,
                            dateOfBirth: patientProfile === null || patientProfile === void 0 ? void 0 : patientProfile.dateOfBirth,
                            gender: patientProfile === null || patientProfile === void 0 ? void 0 : patientProfile.gender,
                            houseName: patientProfile === null || patientProfile === void 0 ? void 0 : patientProfile.houseName,
                            city: patientProfile === null || patientProfile === void 0 ? void 0 : patientProfile.city,
                            state: patientProfile === null || patientProfile === void 0 ? void 0 : patientProfile.state,
                            country: patientProfile === null || patientProfile === void 0 ? void 0 : patientProfile.country,
                        },
                    });
                }
                return {
                    data: responses,
                    page,
                    limit,
                    totalDocs,
                    totalPages: Math.ceil(totalDocs / limit),
                };
            }
            catch (error) {
                console.error("Error in getAllAppointments:", error);
                throw new Error("Failed to fetch all appointments");
            }
        });
    }
    updateStatus(appointmentId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let success = false;
                if (status === "cancelled") {
                    const appointment = yield this._appointmentRepo.findById(appointmentId);
                    if (!appointment) {
                        throw new Error("Appointment not found");
                    }
                    console.log("appointment : ", appointment);
                    if ((appointment === null || appointment === void 0 ? void 0 : appointment.payment) === "paid") {
                        console.log("entered into appointnt if");
                        const userId = appointment.userId;
                        const doctorId = appointment.doctorId;
                        let walletDoctor = yield this._walletRepo.findOne({ userId: doctorId });
                        const doctorIdRaw = typeof appointment.doctorId === "string"
                            ? appointment.doctorId
                            : (_b = (_a = appointment.doctorId._id) === null || _a === void 0 ? void 0 : _a.toString) === null || _b === void 0 ? void 0 : _b.call(_a);
                        if (!doctorIdRaw) {
                            throw new Error("Invalid doctorId");
                        }
                        if (!walletDoctor) {
                            walletDoctor = yield this._walletRepo.create({
                                userId: new mongoose_1.default.Types.ObjectId(doctorIdRaw),
                                role: "doctor",
                            });
                            if (!walletDoctor) {
                                throw new Error("Failed to create Doctor wallet");
                            }
                        }
                        let amount = 0;
                        if (appointment === null || appointment === void 0 ? void 0 : appointment.fee) {
                            amount = Math.floor((appointment === null || appointment === void 0 ? void 0 : appointment.fee) - ((appointment === null || appointment === void 0 ? void 0 : appointment.fee) / 10));
                        }
                        const walletHistoryDoctor = yield this._walletHistoryRepo.create({
                            walletId: walletDoctor === null || walletDoctor === void 0 ? void 0 : walletDoctor._id,
                            appointmentId: new mongoose_1.default.Types.ObjectId(appointmentId),
                            amount: amount,
                            type: "debit",
                            source: "cancel appointment",
                            transactionId: appointment === null || appointment === void 0 ? void 0 : appointment.transactionId,
                        });
                        if (!walletHistoryDoctor) {
                            throw new Error("Failed to create Doctor Wallet History");
                        }
                        const updateDoctor = yield this._walletRepo.updateById(walletDoctor._id, { $inc: { balance: -amount } });
                        console.log("updateDoctor : ", updateDoctor);
                        if (!updateDoctor) {
                            throw new Error("Failed to update wallet balance");
                        }
                        let wallet = yield this._walletRepo.findOne({ userId });
                        if (!wallet) {
                            wallet = yield this._walletRepo.create({
                                userId: new mongoose_1.default.Types.ObjectId(appointment.userId),
                                role: "user",
                            });
                            if (!wallet) {
                                throw new Error("Failed to create wallet");
                            }
                        }
                        const walletHistory = yield this._walletHistoryRepo.create({
                            walletId: wallet === null || wallet === void 0 ? void 0 : wallet._id,
                            appointmentId: new mongoose_1.default.Types.ObjectId(appointmentId),
                            amount: appointment === null || appointment === void 0 ? void 0 : appointment.fee,
                            type: "credit",
                            source: "refund",
                            transactionId: appointment === null || appointment === void 0 ? void 0 : appointment.transactionId,
                        });
                        console.log("walletHistory : ", walletHistory);
                        if (!walletHistory) {
                            throw new Error("failed to create Wallet History");
                        }
                        const update = yield this._walletRepo.updateById(wallet._id, { $inc: { balance: appointment.fee } });
                        if (!update) {
                            throw new Error("Failed to update wallet balance");
                        }
                    }
                    success = yield this._appointmentRepo.cancelWithRefundIfPaid(appointmentId);
                }
                else {
                    const update = yield this._appointmentRepo.updateById(appointmentId, { status });
                    console.log("update: ", update);
                    const appId = update === null || update === void 0 ? void 0 : update._id;
                    const userId = update === null || update === void 0 ? void 0 : update.userId;
                    const doctorId = update === null || update === void 0 ? void 0 : update.doctorId;
                    const participants = [userId, doctorId];
                    const existingChat = yield this._chatRepo.findByAppointmentId(appointmentId);
                    console.log("existing chat : ", existingChat);
                    if (!existingChat) {
                        yield this._chatRepo.createChat({ appointmentId: appId, userId, doctorId, participants });
                    }
                    success = !!update;
                }
                if (!success) {
                    throw new Error(`Failed to ${status} the appointment`);
                }
                return {
                    message: `Appointment ${status} successfully`,
                };
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
}
exports.AppointmentService = AppointmentService;
