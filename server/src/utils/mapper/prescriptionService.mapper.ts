

import { IPrescriptionDocPopulated, IPrescriptionClean } from "../../models/prescription/IPrescription";


export function mapPrescription(
  prescription: IPrescriptionDocPopulated 
): IPrescriptionClean {
  return {
    _id: prescription._id.toString(),
    appointmentId: {
      _id: prescription.appointmentId._id.toString(),
      appointmentNo: prescription.appointmentId.appointmentNo,
      doctorId: prescription.appointmentId.doctorId.toString(),
      userId: prescription.appointmentId.userId.toString(),
      day: prescription.appointmentId.day,
      time: prescription.appointmentId.time,
      status: prescription.appointmentId.status,
      payment: prescription.appointmentId.payment,
      fee: prescription.appointmentId.fee,
      createdAt: prescription.appointmentId.createdAt.toISOString(),
      updatedAt: prescription.appointmentId.updatedAt.toISOString(),
    },
    doctorId: {
      _id: prescription.doctorId._id.toString(),
      name: prescription.doctorId.name,
      email: prescription.doctorId.email,
      role: prescription.doctorId.role,
      isVerified: prescription.doctorId.isVerified,
      isBlocked: prescription.doctorId.isBlocked,
      authProvider: prescription.doctorId.authProvider,
      createdAt: prescription.doctorId.createdAt.toISOString(),
      photo: prescription.doctorId.photo,
    },
    patientId: {
      _id: prescription.patientId._id.toString(),
      name: prescription.patientId.name,
      email: prescription.patientId.email,
      role: prescription.patientId.role,
      isVerified: prescription.patientId.isVerified,
      isBlocked: prescription.patientId.isBlocked,
      authProvider: prescription.patientId.authProvider,
      createdAt: prescription.patientId.createdAt.toISOString(),
      photo: prescription.patientId.photo,
    },
    diagnosis: prescription.diagnosis,
    followUpDate: prescription.followUpDate?.toISOString(),
    notes: prescription.notes,
    medicines: prescription.medicines.map((med) => ({
      _id: med._id.toString(),
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      duration: med.duration,
      instructions: med.instructions,
    })),
    createdAt: prescription.createdAt.toISOString(),
    updatedAt: prescription.updatedAt.toISOString(),
  };
}
