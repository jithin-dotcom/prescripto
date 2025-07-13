import { IAppointment } from "../../models/appointment/IAppointment";
import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";
import { IAppointmentService, IAppointmentResponse, IDoctorUser, IAppointmentFullResponse, ICreateAppointment, ICreateAppointmentResponse} from "../interface/IAppointmentService";
import mongoose from "mongoose";

import { IDoctorProfileRepository } from "../../repositories/interface/IDoctorProfileRepository";
import { IAppointmentWithUserResponse } from "../interface/IAppointmentService";
import { IPatientProfileRepository } from "../../repositories/interface/IPatientProfileRepository";
import { IUserRepository } from "../../repositories/interface/IUserRepository";

// function mapToAppointmentResponse(appointment: IAppointment): IAppointmentResponse {
//   return {
//     _id: (appointment._id as mongoose.Types.ObjectId).toString(),
//     doctorId: appointment.doctorId.toString(),
//     userId: appointment.userId.toString(),
//     date: appointment.date,
//     time: appointment.time,
//     status: appointment.status,
//     transactionId: appointment.transactionId?.toString(),
//   };
// }

// function mapToAppointmentResponse(appointment: IAppointment): IAppointmentResponse {
//   const doctor = appointment.doctorId as any;

//   return {
//     _id: (appointment._id as mongoose.Types.ObjectId).toString(),
//     doctor: {
//       _id: doctor._id.toString(),
//       name: doctor.name,
//       email: doctor.email,
//       photo: doctor.photo,
//     },
//     userId: appointment.userId.toString(),
//     date: appointment.date,
//     time: appointment.time,
//     status: appointment.status,
//     transactionId: appointment.transactionId?.toString(),
//   };
// }

export class AppointmentService implements IAppointmentService {
  constructor(
    private  _appointmentRepo: IAppointmentRepository,
    private _doctorRepo : IDoctorProfileRepository,
    private _patientRepo: IPatientProfileRepository,
    private _userRepo: IUserRepository,
  ) {}

  // async createAppointment(data: Partial<IAppointment>): Promise<IAppointmentResponse> {
  //   if (!data.userId || !data.doctorId || !data.date || !data.time) {
  //     throw new Error("Missing required fields");
  //   }

  //   const appointmentData = {
  //     ...data,
  //     userId: new mongoose.Types.ObjectId(data.userId),
  //     doctorId: new mongoose.Types.ObjectId(data.doctorId),
  //     status: "pending" as "pending", 
  //   };

  //   const created = await this._appointmentRepo.create(appointmentData);
  //   return mapToAppointmentResponse(created);
     
  // }


   
//   async getCreateAppointment(doctorId: string): Promise<ICreateAppointmentResponse> {
//   const appointments = await this._appointmentRepo.findDoctor(
//     new mongoose.Types.ObjectId(doctorId)
//   );
//    console.log("appointments : ",appointments);
//   const responses: ICreateAppointment[] = [];
//   const timeArray = [];

//   for (const appointment of appointments) {
    
      
//       if (!('name' in appointment.doctorId)) {
//       throw new Error("Doctor info not populated");
//     }
//     const doctorUser = appointment.doctorId ;
    
    

//     // Fetch profile using doctor's user _id
//     const profile = await this._DoctorRepo.findOne({
//       doctorId: doctorUser._id,
//     });

//     if(!profile){
//        throw new Error("Profile not found");
//     }
//     timeArray.push(appointment.time);
//     responses.push({
//       _id: (appointment._id as mongoose.Types.ObjectId).toString(),
//       doctor: {
//         _id: doctorUser._id.toString(),
//         name: doctorUser.name,
//         email: doctorUser.email,
//         photo: doctorUser.photo,
//         isVerified: doctorUser.isVerified,
//         educationDetails: profile?.educationDetails,
//         isBlocked: doctorUser.isBlocked,
//         specialization: profile?.specialization || "",
//         yearOfExperience: profile?.yearOfExperience || 0,
//         about: profile?.about || "",
//         fee: profile?.fee || 0,
//         availability: profile?.availability || [],
//       },
//       userId: appointment.userId.toString(),
//       date: appointment.date,
//       time: appointment.time,
//       status: appointment.status,
//       transactionId: appointment.transactionId?.toString(),
//     });
//   }

//   return{
//      responses,
//      timeArray
//   } ;
// }



// async getCreateAppointment(doctorId: string): Promise<ICreateAppointmentResponse> {
//   const responses: ICreateAppointment[] = [];
//   const timeArray: string[] = [];

//   // Fetch doctor user
//   const doctorUser = await this._userRepo.findById(new mongoose.Types.ObjectId(doctorId));
//   console.log("doctorUser", doctorUser);
//   if (!doctorUser) {
//     throw new Error("Doctor not found");
//   }

//   // Fetch doctor profile
//   const profile = await this._doctorRepo.findOne({
//     doctorId: doctorUser._id,
//   });

//   console.log("profile : ",profile);
//   if (!profile) {
//     throw new Error("Doctor profile not found");
//   }

//   // Fetch appointments for doctor
//   const appointments = await this._appointmentRepo.findDoctor(
//     new mongoose.Types.ObjectId(doctorId)
//   );

//   if (appointments.length === 0) {
//     // No appointments found, return empty arrays
//     return {
//       responses,
//       timeArray,
//     };
//   }

//   // Process appointments
//   for (const appointment of appointments) {
//     if (!("name" in appointment.doctorId)) {
//       throw new Error("Doctor info not populated");
//     }

//     const doctor = appointment.doctorId;

//     timeArray.push(appointment.time);

//     responses.push({
//       _id: (appointment._id as mongoose.Types.ObjectId).toString(),
//       doctor: {
//         _id: doctor._id.toString(),
//         name: doctor.name,
//         email: doctor.email,
//         photo: doctor.photo,
//         isVerified: doctor.isVerified,
//         educationDetails: profile.educationDetails,
//         isBlocked: doctor.isBlocked,
//         specialization: profile.specialization || "",
//         yearOfExperience: profile.yearOfExperience || 0,
//         about: profile.about || "",
//         fee: profile.fee || 0,
//         availability: profile.availability || [],
//       },
//       userId: appointment.userId.toString(),
//       date: appointment.date,
//       time: appointment.time,
//       status: appointment.status,
//       transactionId: appointment.transactionId?.toString(),
//     });
//   }

//   return {
//     responses,
//     timeArray,
//   };
// }




  //   async createAppointment(data: Partial<IAppointment>): Promise<{message:string}> {
  //   if (!data.userId || !data.doctorId || !data.date || !data.time) {
  //     throw new Error("Missing required fields");
  //   }

  //   let doctorId: mongoose.Types.ObjectId;
  //     // Narrow the type: check if doctorId is already an ObjectId
  // if (data.doctorId instanceof mongoose.Types.ObjectId) {
  //   doctorId = data.doctorId;
  // } else {
  //   // Assume it's an object with _id field (IDoctorUser)
  //   doctorId = new mongoose.Types.ObjectId((data.doctorId as IDoctorUser)._id);
  // }

  //   const appointmentData = {
  //     ...data,
  //     userId: new mongoose.Types.ObjectId(data.userId),
  //     // doctorId: new mongoose.Types.ObjectId(data.doctorId),
  //     doctorId,
  //     status: "pending" as "pending", 
  //   };

  //    await this._appointmentRepo.create(appointmentData);
  //   return {
  //      message: "successfully created"
  //   }
     
  // }


  async createAppointment(data: Partial<IAppointment>): Promise<{ message: string }> {
  try {
    if (!data.userId || !data.doctorId || !data.date || !data.time) {
      throw new Error("Missing required fields");
    }

    let doctorId: mongoose.Types.ObjectId;

    // Narrow the type: check if doctorId is already an ObjectId
    if (data.doctorId instanceof mongoose.Types.ObjectId) {
      doctorId = data.doctorId;
    } else {
      // Assume it's an object with _id field (IDoctorUser)
      doctorId = new mongoose.Types.ObjectId((data.doctorId as IDoctorUser)._id);
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
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw new Error("Failed to create appointment");
  }
}


  // async getAppointmentsByUser(userId: string): Promise<IAppointmentResponse[]> {
  //   const appointments = await this._appointmentRepo.findByUserId(new mongoose.Types.ObjectId(userId));
  //   return appointments.map(mapToAppointmentResponse);
  // }


//   async getAppointmentsByUser(userId: string): Promise<IAppointmentResponse[]> {
//   const appointments = await this._appointmentRepo.findByUserId(
//     new mongoose.Types.ObjectId(userId)
//   );

//   const responses: IAppointmentResponse[] = [];
  

//   for (const appointment of appointments) {
    
      
//       if (!('name' in appointment.doctorId)) {
//       throw new Error("Doctor info not populated");
//     }
//     const doctorUser = appointment.doctorId ;
    

//     // Fetch profile using doctor's user _id
//     const profile = await this._doctorRepo.findOne({
//       doctorId: doctorUser._id,
//     });

//     if(!profile){
//        throw new Error("Profile not found");
//     }

//     responses.push({
//       _id: (appointment._id as mongoose.Types.ObjectId).toString(),
//       doctor: {
//         _id: doctorUser._id.toString(),
//         name: doctorUser.name,
//         email: doctorUser.email,
//         photo: doctorUser.photo,
//         isVerified: doctorUser.isVerified,
//         educationDetails: profile?.educationDetails,
//         isBlocked: doctorUser.isBlocked,
//         specialization: profile?.specialization || "",
//         yearOfExperience: profile?.yearOfExperience || 0,
//         fee: profile?.fee || 0,
//       },
//       userId: appointment.userId.toString(),
//       date: appointment.date,
//       time: appointment.time,
//       status: appointment.status,
//       transactionId: appointment.transactionId?.toString(),
//     });
//   }

//   return responses;
// }



async getAppointmentsByUser(userId: string): Promise<IAppointmentResponse[]> {
  try {
    const appointments = await this._appointmentRepo.findByUserId(
      new mongoose.Types.ObjectId(userId)
    );

    const responses: IAppointmentResponse[] = [];

    for (const appointment of appointments) {
      if (!("name" in appointment.doctorId)) {
        throw new Error("Doctor info not populated");
      }

      const doctorUser = appointment.doctorId;

      // Fetch profile using doctor's user _id
      const profile = await this._doctorRepo.findOne({
        doctorId: doctorUser._id,
      });

      if (!profile) {
        throw new Error("Profile not found");
      }

      responses.push({
        _id: (appointment._id as mongoose.Types.ObjectId).toString(),
        doctor: {
          _id: doctorUser._id.toString(),
          name: doctorUser.name,
          email: doctorUser.email,
          photo: doctorUser.photo,
          isVerified: doctorUser.isVerified,
          educationDetails: profile.educationDetails,
          isBlocked: doctorUser.isBlocked,
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

    return responses;
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    throw new Error("Failed to fetch user appointments");
  }
}





// async getCreateAppointment(doctorId: string): Promise<ICreateAppointmentResponse> {
//   const responses: ICreateAppointment[] = [];
//   const timeArray: string[] = [];

//   // Fetch doctor user
//   const doctorUser = await this._userRepo.findById(new mongoose.Types.ObjectId(doctorId)) 
//   if (!doctorUser) {
//     throw new Error("Doctor not found");
//   }

//   // Fetch doctor profile
//   const profile = await this._doctorRepo.findOne({
//     doctorId: doctorUser._id,
//   });

//   if (!profile) {
//     throw new Error("Doctor profile not found");
//   }

//   // Fetch appointments for doctor
//   const appointments = await this._appointmentRepo.findDoctor(
//     new mongoose.Types.ObjectId(doctorId)
//   );

//   if (appointments.length === 0) {
//     // No appointments — return empty responses but still inject doctor info
//     responses.push({
//       _id: "", 
//       doctor: {
//         _id: (doctorUser._id as mongoose.Types.ObjectId).toString(),
//         name: doctorUser.name,
//         email: doctorUser.email,
//         photo: doctorUser.photo,
//         isVerified: doctorUser.isVerified,
//         educationDetails: profile.educationDetails,
//         isBlocked: doctorUser.isBlocked,
//         specialization: profile.specialization || "",
//         yearOfExperience: profile.yearOfExperience || 0,
//         about: profile.about || "",
//         fee: profile.fee || 0,
//         availability: profile.availability || [],
//       },
//       userId: "",
//       date: "",
//       time: "",
//       status: "pending",
//       transactionId: "",
//     });

//     return {
//       responses,
//       timeArray,
//     };
//   }

//   // Appointments exist
//   for (const appointment of appointments) {
//     if (!("name" in appointment.doctorId)) {
//       throw new Error("Doctor info not populated");
//     }

//     const doctor = appointment.doctorId;
//     timeArray.push(appointment.time);

//     responses.push({
//       _id: (appointment._id as mongoose.Types.ObjectId).toString(),
//       doctor: {
//         _id: doctor._id.toString(),
//         name: doctor.name,
//         email: doctor.email,
//         photo: doctor.photo,
//         isVerified: doctor.isVerified,
//         educationDetails: profile.educationDetails,
//         isBlocked: doctor.isBlocked,
//         specialization: profile.specialization || "",
//         yearOfExperience: profile.yearOfExperience || 0,
//         about: profile.about || "",
//         fee: profile.fee || 0,
//         availability: profile.availability || [],
//       },
//       userId: appointment.userId.toString(),
//       date: appointment.date,
//       time: appointment.time,
//       status: appointment.status,
//       transactionId: appointment.transactionId?.toString(),
//     });
//   }

//   return {
//     responses,
//     timeArray,
//   };
// }




async getCreateAppointment(doctorId: string): Promise<ICreateAppointmentResponse> {
  try {
    const responses: ICreateAppointment[] = [];
    const timeArray: string[] = [];

    // Fetch doctor user
    const doctorUser = await this._userRepo.findById(new mongoose.Types.ObjectId(doctorId));
    if (!doctorUser) {
      throw new Error("Doctor not found");
    }

    // Fetch doctor profile
    const profile = await this._doctorRepo.findOne({
      doctorId: doctorUser._id,
    });

    if (!profile) {
      throw new Error("Doctor profile not found");
    }

    // Fetch appointments for doctor
    const appointments = await this._appointmentRepo.findDoctor(
      new mongoose.Types.ObjectId(doctorId)
    );

    if (appointments.length === 0) {
      // No appointments — return empty responses but still inject doctor info
      responses.push({
        _id: "",
        doctor: {
          _id: (doctorUser._id as mongoose.Types.ObjectId).toString(),
          name: doctorUser.name,
          email: doctorUser.email,
          photo: doctorUser.photo,
          isVerified: doctorUser.isVerified,
          educationDetails: profile.educationDetails,
          isBlocked: doctorUser.isBlocked,
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

    // Appointments exist
    for (const appointment of appointments) {
      if (!("name" in appointment.doctorId)) {
        throw new Error("Doctor info not populated");
      }

      const doctor = appointment.doctorId;
      timeArray.push(appointment.time);

      responses.push({
        _id: (appointment._id as mongoose.Types.ObjectId).toString(),
        doctor: {
          _id: doctor._id.toString(),
          name: doctor.name,
          email: doctor.email,
          photo: doctor.photo,
          isVerified: doctor.isVerified,
          educationDetails: profile.educationDetails,
          isBlocked: doctor.isBlocked,
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
        transactionId: appointment.transactionId?.toString(),
      });
    }

    return {
      responses,
      timeArray,
    };
  } catch (error) {
    console.error("Error in getCreateAppointment:", error);
    throw new Error("Failed to get doctor appointment info");
  }
}




// async getAppointmentsByDoctor(
//   doctorId: string
// ): Promise<IAppointmentWithUserResponse[]> {

//   const appointments = await this._appointmentRepo.findByDoctorId(
//     new mongoose.Types.ObjectId(doctorId)
//   );

//   const responses: IAppointmentWithUserResponse[] = [];

//   for (const appointment of appointments) {
//     const user = appointment.userId as any;

//     if (!user || !user._id) continue;

//     const patientProfile = await this._patientRepo.findOne({
//       patientId: user._id,
//     });

//     const doctorProfile = await this._doctorRepo.findOne({doctorId});
//     if(!doctorProfile){
//        throw new Error("Doctor profile missing");
//     }

//     // console.log("doctor profile : ",doctorProfile);
//     responses.push({
//       _id: (appointment._id as mongoose.Types.ObjectId).toString(),
//       doctorId: appointment.doctorId.toString(),
//       user: {
//         _id: user._id.toString(),
//         name: user.name,
//         email: user.email,
//         photo: user.photo,
//         isVerified: user.isVerified,
//         isBlocked: user.isBlocked,
//         dateOfBirth: patientProfile?.dateOfBirth,
//         gender: patientProfile?.gender,
//         houseName: patientProfile?.houseName,
//         city: patientProfile?.city,
//         state: patientProfile?.state,
//         country: patientProfile?.country,
//         pin: patientProfile?.pin,
//         // profilePhoto: patientProfile?.profilePhoto,
//       },
//       fee: doctorProfile?.fee,
//       date: appointment.date,
//       time: appointment.time,
//       status: appointment.status,
//       transactionId: appointment.transactionId?.toString(),
//     });
//   }

//   return responses;
// }


async getAppointmentsByDoctor(
  doctorId: string
): Promise<IAppointmentWithUserResponse[]> {
  try {
    const appointments = await this._appointmentRepo.findByDoctorId(
      new mongoose.Types.ObjectId(doctorId)
    );

    const responses: IAppointmentWithUserResponse[] = [];

    for (const appointment of appointments) {
      const user = appointment.userId as any;

      if (!user || !user._id) continue;

      const patientProfile = await this._patientRepo.findOne({
        patientId: user._id,
      });

      const doctorProfile = await this._doctorRepo.findOne({ doctorId });
      if (!doctorProfile) {
        throw new Error("Doctor profile missing");
      }

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
        fee: doctorProfile.fee,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        transactionId: appointment.transactionId?.toString(),
      });
    }

    return responses;
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    throw new Error("Failed to fetch appointments for doctor");
  }
}



// async getAllAppointments(): Promise<IAppointmentFullResponse[]> {
//   const appointments = await this._appointmentRepo.findAllPopulated(); // you must implement this in repo

//   const responses: IAppointmentFullResponse[] = [];
//   const timeArray = [];

//   for (const appointment of appointments) {
//     const doctorUser = appointment.doctorId as any;
//     const patientUser = appointment.userId as any;

//     timeArray.push(appointment.time);
//     if (!doctorUser || !doctorUser._id || !patientUser || !patientUser._id) {
//       continue;
//     }

//     const doctorProfile = await this._doctorRepo.findOne({ doctorId: doctorUser._id });
//     const patientProfile = await this._patientRepo.findOne({ patientId: patientUser._id });

//     if (!doctorProfile) continue;

//     responses.push({
//       _id: (appointment._id as mongoose.Types.ObjectId).toString(),
//       date: appointment.date,
//       time: appointment.time,
//       status: appointment.status,
//       transactionId: appointment.transactionId?.toString(),
//       timeArray,

//       doctor: {
//         _id: doctorUser._id.toString(),
//         name: doctorUser.name,
//         email: doctorUser.email,
//         photo: doctorUser.photo,
//         isVerified: doctorUser.isVerified,
//         isBlocked: doctorUser.isBlocked,
//         educationDetails: doctorProfile.educationDetails,
//         specialization: doctorProfile.specialization || "",
//         yearOfExperience: doctorProfile.yearOfExperience || 0,
//         fee: doctorProfile.fee || 0,
//       },

//       user: {
//         _id: patientUser._id.toString(),
//         name: patientUser.name,
//         email: patientUser.email,
//         photo: patientUser.photo,
//         isVerified: patientUser.isVerified,
//         isBlocked: patientUser.isBlocked,
//         dateOfBirth: patientProfile?.dateOfBirth,
//         gender: patientProfile?.gender,
//         houseName: patientProfile?.houseName,
//         city: patientProfile?.city,
//         state: patientProfile?.state,
//         country: patientProfile?.country,
//         // pin: patientProfile?.pin,
//       },
//     });
//   }

//   return responses;
// }




async getAllAppointments(): Promise<IAppointmentFullResponse[]> {
  try {
    const appointments = await this._appointmentRepo.findAllPopulated(); // must be implemented in repo

    const responses: IAppointmentFullResponse[] = [];
    const timeArray: string[] = [];

    for (const appointment of appointments) {
      const doctorUser = appointment.doctorId as any;
      const patientUser = appointment.userId as any;

      timeArray.push(appointment.time);

      if (!doctorUser || !doctorUser._id || !patientUser || !patientUser._id) {
        continue;
      }

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
          // pin: patientProfile?.pin,
        },
      });
    }

    return responses;
  } catch (error) {
    console.error("Error in getAllAppointments:", error);
    throw new Error("Failed to fetch all appointments");
  }
}



//  async getProfile(userId: string): Promise<{user: IUser, profile: IPatientProfile | IDoctorProfile | null}|null> {
//   try {
//     const user = await this._userRepo.findById(userId);

//     if (!user) return null;

    
//     let profile = null;
//     if(user.role === "user"){
//        profile = await this._patientRepo.findOne({patientId: userId});
//     }else if(user.role === "doctor"){
//         profile = await this._doctorRepo.findOne({doctorId: userId});
//     }
    

//     return {
//        user,
//        profile
//     }

//   } catch (error) {
//     console.error(error);
//     throw new Error(`Failed to fetch profile`);
//   }
// }






  // async getAppointmentsByDoctor(doctorId: string): Promise<IAppointmentResponse[]> {
  //   const appointments = await this._appointmentRepo.findByDoctorId(new mongoose.Types.ObjectId(doctorId));
  //   return appointments.map(mapToAppointmentResponse);
  // }

//   async cancelAppointment(id: string): Promise<void> {
//     const existing = await this._appointmentRepo.findById(new mongoose.Types.ObjectId(id));
//     if (!existing) {
//       throw new Error("Appointment not found");
//     }

//     await this._appointmentRepo.updateById(existing._id  as mongoose.Types.ObjectId, { status: "cancelled" });
//   }
}
