import { IAppointment } from "../../models/appointment/IAppointment";
import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";
import { IAppointmentService, IAppointmentResponse, IDoctorUser, IAppointmentFullResponse, ICreateAppointment, ICreateAppointmentResponse} from "../interface/IAppointmentService";
import mongoose from "mongoose";

import { IDoctorProfileRepository } from "../../repositories/interface/IDoctorProfileRepository";
import { IAppointmentWithUserResponse } from "../interface/IAppointmentService";
import { IPatientProfileRepository } from "../../repositories/interface/IPatientProfileRepository";
import { IUserRepository } from "../../repositories/interface/IUserRepository";


export class AppointmentService implements IAppointmentService {
  constructor(
    private _appointmentRepo: IAppointmentRepository,
    private _doctorRepo : IDoctorProfileRepository,
    private _patientRepo: IPatientProfileRepository,
    private _userRepo: IUserRepository,
  ) {}


async createAppointment(data: Partial<IAppointment>): Promise<{ message: string }> {
  try {
    if (!data.userId || !data.doctorId || !data.date || !data.time) {
      throw new Error("Missing required fields");
    }
    console.log("data : ",data);

    let doctorId: mongoose.Types.ObjectId;

   
    if (data.doctorId instanceof mongoose.Types.ObjectId) {
      doctorId = data.doctorId;
    } else {
     
      doctorId = new mongoose.Types.ObjectId((data.doctorId as IDoctorUser)._id);
    }
    const doctor = await this._doctorRepo.findOne({doctorId:doctorId});
    if(doctor?.fee){
       data.fee = doctor.fee;
    }

    const [dayStr, monthStr, yearStr] = data.date.split("/");
    const dateObj = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
    const appointmentDay = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    const dayAvailability = doctor?.availability?.find(slot => slot.day === appointmentDay);
    if (!dayAvailability) {
      throw new Error(`Doctor is not available on ${appointmentDay}`);
    }

    const timeToMinutes = (timeStr: string): number => {
       const [time, period] = timeStr.split(" ");
       let [hour, minute] = time.split(":").map(Number);
       if (period === "PM" && hour !== 12) hour += 12;
       if (period === "AM" && hour === 12) hour = 0;
       return hour * 60 + minute;
    };

    const bookingTime = timeToMinutes(data.time!);
    const fromTime = timeToMinutes(dayAvailability.from);
    const toTime = timeToMinutes(dayAvailability.to);

    if (bookingTime < fromTime || bookingTime >= toTime) {
      throw new Error(`Doctor is only available from ${dayAvailability.from} to ${dayAvailability.to} on ${appointmentDay}`);
    }
  
    console.log("doctor  : ",doctor );
    const doctorAppointment = await this._appointmentRepo.findAll({doctorId:doctorId});
   
    const timeArray = new Set();
    doctorAppointment.forEach((obj) => {
       timeArray.add(obj.time);
    })
    if(timeArray.has(data.time)){
       throw new Error("Slot not Available");
    }
    const appointmentData = {
      ...data,
      userId: new mongoose.Types.ObjectId(data.userId),
      doctorId,
      status: "pending" as "pending",
    };

    await this._appointmentRepo.create(appointmentData);

    return {
      message: "successfully created",
    };
  } catch (error: unknown) {
    console.error("Error creating appointment:", error);
    if(error instanceof Error){
       throw error;
    }else{
        throw new Error("Failed to create Appointment");
    }
    
  }
}




async getAppointmentsByUser(
  userId: string,
  page: number,
  limit: number,
  status?: string
): Promise<{
  data: IAppointmentResponse[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
}> {
  try {
    const skip = (page - 1) * limit;
    const filter: any = { userId: new mongoose.Types.ObjectId(userId) };

    if (status) {
      filter.status = status;
    }

    const totalDocs = await this._appointmentRepo.countAllFiltered(filter);
    const appointments = await this._appointmentRepo.findUserFilteredPaginated(skip, limit, filter);

    const responses: IAppointmentResponse[] = [];

    for (const appointment of appointments) {
      const doctorUser = appointment.doctorId as any;

      if (!doctorUser || !doctorUser._id) continue;

      const profile = await this._doctorRepo.findOne({
        doctorId: doctorUser._id,
      });

      if (!profile) continue;

      responses.push({
        _id: (appointment._id as mongoose.Types.ObjectId).toString(),
        doctor: {
          _id: doctorUser._id.toString(),
          name: doctorUser.name,
          email: doctorUser.email,
          photo: doctorUser.photo,
          isVerified: doctorUser.isVerified,
          isBlocked: doctorUser.isBlocked,
          educationDetails: profile.educationDetails,
          specialization: profile.specialization || "",
          yearOfExperience: profile.yearOfExperience || 0,
          fee: profile.fee || 0,
        },
        userId: appointment.userId.toString(),
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        transactionId: appointment.transactionId?.toString(),
      });
    }

    return {
      data: responses,
      totalDocs,
      totalPages: Math.ceil(totalDocs / limit),
      page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    throw new Error("Failed to fetch user appointments");
  }
}



async getCreateAppointment(doctorId: string): Promise<ICreateAppointmentResponse> {
  try {
    const responses: ICreateAppointment[] = [];
    const timeArray: string[] = [];

    const doctorUser = await this._userRepo.findById(new mongoose.Types.ObjectId(doctorId));
    if (!doctorUser) {
      return {
        responses: [],
        timeArray: [],
      };
    }

    const profile = await this._doctorRepo.findOne({ doctorId: doctorUser._id });

   
    if (!profile) {
      return {
        responses: [
          {
            _id: "",
            doctor: {
              _id: (doctorUser._id as mongoose.Types.ObjectId).toString(),
              name: doctorUser.name,
              email: doctorUser.email,
              photo: doctorUser.photo,
              isVerified: doctorUser.isVerified,
              isBlocked: doctorUser.isBlocked,
              educationDetails: "",
              specialization: "",
              yearOfExperience: 0,
              about: "",
              fee: 0,
              availability: [],
            },
            userId: "",
            date: "",
            time: "",
            status: "pending",
            transactionId: "",
          },
        ],
        timeArray: [],
      };
    }

    const appointments = await this._appointmentRepo.findDoctor(
      new mongoose.Types.ObjectId(doctorId)
    );

    if (!appointments || appointments.length === 0) {
      responses.push({
        _id: "",
        doctor: {
          _id: (doctorUser._id as mongoose.Types.ObjectId).toString(),
          name: doctorUser.name,
          email: doctorUser.email,
          photo: doctorUser.photo,
          isVerified: doctorUser.isVerified,
          isBlocked: doctorUser.isBlocked,
          educationDetails: profile.educationDetails || "",
          specialization: profile.specialization || "",
          yearOfExperience: profile.yearOfExperience || 0,
          about: profile.about || "",
          fee: profile.fee || 0,
          availability: profile.availability || [],
        },
        userId: "",
        date: "",
        time: "",
        status: "pending",
        transactionId: "",
      });

      return {
        responses,
        timeArray,
      };
    }

    for (const appointment of appointments) {
      const doctor = appointment.doctorId as any;

     
      if (!doctor || typeof doctor !== "object" || !("name" in doctor)) {
        continue;
      }

      timeArray.push(appointment.time);

      responses.push({
        _id: (appointment._id as mongoose.Types.ObjectId).toString(),
        doctor: {
          _id: doctor._id.toString(),
          name: doctor.name,
          email: doctor.email,
          photo: doctor.photo,
          isVerified: doctor.isVerified,
          isBlocked: doctor.isBlocked,
          educationDetails: profile.educationDetails || "",
          specialization: profile.specialization || "",
          yearOfExperience: profile.yearOfExperience || 0,
          about: profile.about || "",
          fee: profile.fee || 0,
          availability: profile.availability || [],
        },
        userId: appointment.userId.toString(),
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        transactionId: appointment.transactionId?.toString() || "",
      });
    }

    return {
      responses,
      timeArray,
    };
  } catch (error) {
    console.error("Error in getCreateAppointment:", error);
    return {
      responses: [],
      timeArray: [],
    };
  }
}




async getAppointmentsByDoctor(
  doctorId: string,
  page: number,
  limit: number,
  status?: string
): Promise<{
  data: IAppointmentWithUserResponse[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
}> {
  try {
    const skip = (page - 1) * limit;

    const filter: any = { doctorId: new mongoose.Types.ObjectId(doctorId) };
    if (status) {
      filter.status = status;
    }

    const totalDocs = await this._appointmentRepo.countAllFiltered(filter);
    const appointments = await this._appointmentRepo.findDoctorFilteredPaginated(
      skip,
      limit,
      filter
    );

    const responses: IAppointmentWithUserResponse[] = [];

    for (const appointment of appointments) {
      const user = appointment.userId as any;

      if (!user || !user._id) continue;

      const patientProfile = await this._patientRepo.findOne({ patientId: user._id });
      const doctorProfile = await this._doctorRepo.findOne({ doctorId });

      if (!doctorProfile) throw new Error("Doctor profile missing");

      responses.push({
        _id: (appointment._id as mongoose.Types.ObjectId).toString(),
        doctorId: appointment.doctorId.toString(),
        user: {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          photo: user.photo,
          isVerified: user.isVerified,
          isBlocked: user.isBlocked,
          dateOfBirth: patientProfile?.dateOfBirth,
          gender: patientProfile?.gender,
          houseName: patientProfile?.houseName,
          city: patientProfile?.city,
          state: patientProfile?.state,
          country: patientProfile?.country,
          pin: patientProfile?.pin,
        },
        fee: appointment.fee || doctorProfile.fee,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        transactionId: appointment.transactionId?.toString(),
      });
    }

    return {
      data: responses,
      totalDocs,
      totalPages: Math.ceil(totalDocs / limit),
      page,
      limit,
    };
  } catch (error) {
    console.error("Error in getAppointmentsByDoctor:", error);
    throw new Error("Failed to fetch appointments for doctor");
  }
}



async getAllAppointments(
  page: number,
  limit: number,
  status?: string,
  
): Promise<{
  data: IAppointmentFullResponse[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
}> {
  try {
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (status) {
      filter.status = status;
    }
    
    

    const totalDocs = await this._appointmentRepo.countAllFiltered(filter);
    const appointments = await this._appointmentRepo.findAllPopulatedPaginatedFiltered(
      skip,
      limit,
      filter
    );

    const responses: IAppointmentFullResponse[] = [];
    const timeArray: string[] = [];

    for (const appointment of appointments) {
      const doctorUser = appointment.doctorId as any;
      const patientUser = appointment.userId as any;

      timeArray.push(appointment.time);
      if (!doctorUser?._id || !patientUser?._id) continue;

      const doctorProfile = await this._doctorRepo.findOne({ doctorId: doctorUser._id });
      const patientProfile = await this._patientRepo.findOne({ patientId: patientUser._id });
      if (!doctorProfile) continue;
      

      responses.push({
        _id: (appointment._id as mongoose.Types.ObjectId).toString(),
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        transactionId: appointment.transactionId?.toString(),
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
          dateOfBirth: patientProfile?.dateOfBirth,
          gender: patientProfile?.gender,
          houseName: patientProfile?.houseName,
          city: patientProfile?.city,
          state: patientProfile?.state,
          country: patientProfile?.country,
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
  } catch (error) {
    console.error("Error in getAllAppointments:", error);
    throw new Error("Failed to fetch all appointments");
  }
}




async updateStatus(appointmentId: string, status: string): Promise<{message: string}>{
   try {
      const update = await this._appointmentRepo.updateById(appointmentId,{status:status});
      if(!update){
         throw new Error(`Failed to ${status} the Appointment`);
      }
      return {
        message: `Appointment ${status} successfully`
      }
   } catch (error) {
      if(error instanceof Error){
         throw error;
      }else{
         throw new Error("Something went wrong");
      }
   }
 }

}
