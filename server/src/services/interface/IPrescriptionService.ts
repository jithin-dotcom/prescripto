
import { IPrescription } from "../../models/prescription/IPrescription"

export interface IPrescriptionService {
    createPrescription(data: IPrescription): Promise<IPrescription>;
    getPrescription(appointmentId: string): Promise<IPrescription | null>;
}