

import { IConcern } from "../../../models/concern/IConcern";
import { CreateConcernDTO } from "./IConcernService";


export const mapCreateConcernToEntity = (dto: CreateConcernDTO): Partial<IConcern> => ({
  appointmentId: dto.appointmentId,
  doctorId: dto.doctorId,
  userId: dto.userId,
  doctorName: dto.doctorName,
  title: dto.title,
  description: dto.description,
  status: "pending", 
});