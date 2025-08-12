"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAppointmentToDTO = mapAppointmentToDTO;
function mapAppointmentToDTO(appointment, doctorUser, profile) {
    var _a;
    return {
        _id: appointment._id.toString(),
        doctor: {
            _id: doctorUser._id.toString(),
            name: doctorUser.name,
            email: doctorUser.email,
            photo: doctorUser.photo,
            isVerified: doctorUser.isVerified,
            isBlocked: doctorUser.isBlocked,
            educationDetails: profile.educationDetails,
            averageRating: profile.averageRating || 0,
            ratingCount: profile.ratingCount || 0,
            specialization: profile.specialization || "",
            yearOfExperience: profile.yearOfExperience || 0,
            fee: profile.fee || 0,
        },
        userId: appointment.userId.toString(),
        date: appointment.day,
        time: appointment.time,
        status: appointment.status,
        appointmentNo: appointment.appointmentNo || 0,
        transactionId: (_a = appointment.transactionId) === null || _a === void 0 ? void 0 : _a.toString(),
        payment: appointment.payment,
    };
}
