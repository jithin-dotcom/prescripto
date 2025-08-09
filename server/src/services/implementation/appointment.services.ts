import { IAppointment } from "../../models/appointment/IAppointment";
import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";
import { IAppointmentService, IAppointmentResponse, IDoctorUser, IAppointmentFullResponse, ICreateAppointment, ICreateAppointmentResponse} from "../interface/IAppointmentService";
import mongoose from "mongoose";
import { IAvailabilitySlot, ITimeBlock } from "../../models/doctor/IDoctorProfile";

import { IDoctorProfileRepository } from "../../repositories/interface/IDoctorProfileRepository";
import { IAppointmentWithUserResponse, IDoctorInfo } from "../interface/IAppointmentService";
import { IPatientProfileRepository } from "../../repositories/interface/IPatientProfileRepository";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { IChatRepository } from "../../repositories/interface/IChatRepository";
import { IWalletRepository } from "../../repositories/interface/IWalletRepository";
import { IWalletHistoryRepository } from "../../repositories/interface/IWalletHistoryRepository";
import { mapAppointmentToDTO } from "../../utils/mapper/appointmentService.mapper";


export class AppointmentService implements IAppointmentService {
  constructor(
    private _appointmentRepo: IAppointmentRepository,
    private _doctorRepo : IDoctorProfileRepository,
    private _patientRepo: IPatientProfileRepository,
    private _userRepo: IUserRepository,
    private _chatRepo: IChatRepository,
    private _walletRepo: IWalletRepository,
    private _walletHistoryRepo: IWalletHistoryRepository,
  ) {}



async createAppointment(data: Partial<IAppointment>): Promise<{ message: string }> {
  try {
    if (!data.userId || !data.doctorId || !data.day || !data.time) {
      throw new Error("Missing required fields");
    }

   
    const doctorId = data.doctorId instanceof mongoose.Types.ObjectId
      ? data.doctorId
      : new mongoose.Types.ObjectId((data.doctorId as IDoctorUser)._id);

   
    const doctor = await this._doctorRepo.findOne({ doctorId });
    if (!doctor) throw new Error("Doctor not found");

    const patientProfile = await this._patientRepo.findOne({patientId:data.userId});
    if(!patientProfile){
       throw new Error("Please complete your Profile to Book Appointments");
    }
  
    if (doctor.fee) {
      data.fee = doctor.fee;
    }

    
    data.appointmentNo = Math.floor(100000 + Math.random() * 900000);

   
    const [dayStr, monthStr, yearStr] = data.day.split("/");
    const selectedDate = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));

   
    const appointmentWeekday = selectedDate.toLocaleDateString("en-US", { weekday: "long" });

   
    const availabilitySlot = doctor.availability?.find(
      (slot): slot is IAvailabilitySlot => slot.day === appointmentWeekday
    );

    if (!availabilitySlot) {
      throw new Error(`Doctor is not available on ${appointmentWeekday}`);
    }

   
    const timeToMinutes = (timeStr: string): number => {
      const [time, period] = timeStr.split(" ");
      let [hour, minute] = time.split(":").map(Number);
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;
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

    
    const existingAppointments = await this._appointmentRepo.findAll({ doctorId });
    const isSlotTaken = existingAppointments.some(app => {
      if(app.status !== "cancelled" ){
         return app.day === data.day && app.time === data.time;
      }
      
    });

    if (isSlotTaken) {
      throw new Error("Slot not available for the selected date and time");
    }

    
    const appointmentData: IAppointment = {
      ...data,
      userId: new mongoose.Types.ObjectId(data.userId),
      doctorId,
      status: "pending",
      payment: "not paid",
    } as IAppointment;

    await this._appointmentRepo.create(appointmentData);

    return { message: "successfully created" };

  } catch (error) {
    console.error("Error creating appointment:", error);
    if (error instanceof Error) throw error;
    throw new Error("Failed to create appointment");
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
    const filter: {userId: mongoose.Types.ObjectId, status?: string} = { userId: new mongoose.Types.ObjectId(userId) };

    if (status) {
      filter.status = status;
    }

    const totalDocs = await this._appointmentRepo.countAllFiltered(filter);
    const appointments = await this._appointmentRepo.findUserFilteredPaginated(skip, limit, filter);

    const responses: IAppointmentResponse[] = [];

    for (const appointment of appointments) {
      const doctorUser = appointment.doctorId as IDoctorInfo;

      if (!doctorUser || !doctorUser._id) continue;

      const profile = await this._doctorRepo.findOne({
        doctorId: doctorUser._id,
      });

      if (!profile) continue;

      // responses.push({
      //   _id: (appointment._id as mongoose.Types.ObjectId).toString(),
      //   doctor: {
      //     _id: doctorUser._id.toString(),
      //     name: doctorUser.name,
      //     email: doctorUser.email,
      //     photo: doctorUser.photo,
      //     isVerified: doctorUser.isVerified,
      //     isBlocked: doctorUser.isBlocked,
      //     educationDetails: profile.educationDetails,
      //     averageRating: profile.averageRating || 0,
      //     ratingCount: profile.ratingCount || 0,
      //     specialization: profile.specialization || "",
      //     yearOfExperience: profile.yearOfExperience || 0,
      //     fee: profile.fee || 0,
      //   },
      //   userId: appointment.userId.toString(),
      //   date: appointment.day,
      //   time: appointment.time,
      //   status: appointment.status,
      //   appointmentNo: appointment.appointmentNo || 0,
      //   transactionId: appointment.transactionId?.toString(),
      //   payment: appointment.payment,
      // });
      const mapped = mapAppointmentToDTO(appointment, doctorUser, profile);
      responses.push(mapped)
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
    const timeArray: Record<string, string[]> = {};

    const doctorObjectId = new mongoose.Types.ObjectId(doctorId);
    const doctorUser = await this._userRepo.findById(doctorObjectId);
    if (!doctorUser) return { responses: [], timeArray: {} };

    const profile = await this._doctorRepo.findOne({ doctorId: doctorObjectId });
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
      _id: (doctorUser._id as mongoose.Types.ObjectId).toString(),
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

    const appointments = await this._appointmentRepo.findDoctor(doctorObjectId);
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
      if(appointment.status !== "cancelled" ){
        timeArray[date].push(time);
      }
      
      responses.push({
        _id: (appointment._id as mongoose.Types.ObjectId).toString(),
        doctor: doctorData,
        userId: appointment.userId.toString(),
        date,
        time,
        appointmentNo: appointment.appointmentNo || 0,
        status: appointment.status,
        transactionId: appointment.transactionId?.toString() || "",
      });
    }
   
    return { responses, timeArray };
  } catch (error) {
    console.error("Error in getCreateAppointment:", error);
    return { responses: [], timeArray: {} };
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
        date: appointment.day,
        time: appointment.time,
        appointmentNo: appointment.appointmentNo || 0,
        status: appointment.status,
        payment: appointment.payment,
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
        date: appointment.day,
        time: appointment.time,
        status: appointment.status,
        payment: appointment.payment,
        appointmentNo: appointment.appointmentNo || 0,
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




async updateStatus(appointmentId: string, status: string): Promise<{ message: string }> {
  try {
    let success = false;

    if (status === "cancelled") {
      
      const appointment = await this._appointmentRepo.findById(appointmentId);
      if(!appointment){
         throw new Error("Appointment not found");
      }
      console.log("appointment : ",appointment);
      if(appointment?.payment === "paid"){
        console.log("entered into appointnt if");
          const userId = appointment.userId;
          const doctorId = appointment.doctorId;
          let walletDoctor = await this._walletRepo.findOne({userId:doctorId});
              const doctorIdRaw = typeof appointment.doctorId === "string"
                              ? appointment.doctorId
                              : appointment.doctorId._id?.toString?.();

          if (!doctorIdRaw) {
             throw new Error("Invalid doctorId");
          }

         
          if(!walletDoctor){
             walletDoctor = await this._walletRepo.create({
                userId: new mongoose.Types.ObjectId(doctorIdRaw),
                role: "doctor",
             })
             if(!walletDoctor){
               throw new Error("Failed to create Doctor wallet");
             }
          }
         
          let amount = 0;
          if(appointment?.fee){
              amount = Math.floor(appointment?.fee - (appointment?.fee/10))
          }
          
          const walletHistoryDoctor = await this._walletHistoryRepo.create({
             walletId: walletDoctor?._id as mongoose.Types.ObjectId, 
             appointmentId: new mongoose.Types.ObjectId(appointmentId),
             amount: amount,
             type: "debit",
             source: "cancel appointment",
             transactionId: appointment?.transactionId,
           })
         
          if(!walletHistoryDoctor){
             throw new Error("Failed to create Doctor Wallet History");
          }

          const updateDoctor = await this._walletRepo.updateById(walletDoctor._id as mongoose.Types.ObjectId,{$inc:{balance: -amount}});
          console.log("updateDoctor : ",updateDoctor);
          if(!updateDoctor){
             throw new Error("Failed to update wallet balance");
          } 

  
          
          let wallet = await this._walletRepo.findOne({userId});        
          if(!wallet){
            
            wallet = await this._walletRepo.create({
              userId: new mongoose.Types.ObjectId(appointment.userId),
              role: "user",
            })
           
            if(!wallet){
              throw new Error("Failed to create wallet");
            }
          } 
    
      const walletHistory = await this._walletHistoryRepo.create({
          walletId: wallet?._id as mongoose.Types.ObjectId, 
          appointmentId: new mongoose.Types.ObjectId(appointmentId),
          amount: appointment?.fee,
          type: "credit",
          source: "refund",
          transactionId: appointment?.transactionId,
      })
      console.log("walletHistory : ",walletHistory);
      if(!walletHistory){
          throw new Error("failed to create Wallet History");
      }
      const update = await this._walletRepo.updateById(wallet._id as mongoose.Types.ObjectId,{$inc:{balance:appointment.fee}});
      if(!update){
        throw new Error("Failed to update wallet balance");
      } 
     }
     success = await this._appointmentRepo.cancelWithRefundIfPaid(appointmentId);

    }else {
      const update = await this._appointmentRepo.updateById(appointmentId, { status });
      console.log("update: ", update);
      const appId = update?._id as mongoose.Types.ObjectId;
      const userId = update?.userId as mongoose.Types.ObjectId;
      const doctorId = update?.doctorId as mongoose.Types.ObjectId;
      const participants = [userId, doctorId] as mongoose.Types.ObjectId[];
      const existingChat = await this._chatRepo.findByAppointmentId(appointmentId);
      console.log("existing chat : ", existingChat);
      if(!existingChat){
         await this._chatRepo.createChat({appointmentId: appId, userId, doctorId, participants})
      }
    
      success = !!update;
    }

    if (!success) {
      throw new Error(`Failed to ${status} the appointment`);
    }

    return {
      message: `Appointment ${status} successfully`,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }
}


}
