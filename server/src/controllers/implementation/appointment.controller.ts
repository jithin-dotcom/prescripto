// // import { Request, Response, NextFunction } from "express";
// // import { IAppointmentController } from "../interface/IAppointmentController";
// // import { IAppointmentService } from "../../services/interface/IAppointmentService";
// // import { appointmentSchema } from "../../validations/appointment.schema";
// // import { StatusCode } from "../../constants/statusCode.enum";
// // import { StatusMessage } from "../../constants/statusMessage";
// // import mongoose from "mongoose"; 

// // export class AppointmentController implements IAppointmentController {
// //   constructor(private readonly _appointmentService: IAppointmentService) {}

// //   async createAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
// //     try {
      
// //       const validatedData = appointmentSchema.parse(req.body);

      
// //       const appointment = await this._appointmentService.createAppointment({
// //         ...validatedData,
// //         userId: new mongoose.Types.ObjectId(validatedData.userId),
// //         doctorId: new mongoose.Types.ObjectId(validatedData.doctorId),
// //         transactionId: validatedData.transactionId
// //           ? new mongoose.Types.ObjectId(validatedData.transactionId)
// //           : undefined,
// //       });

      
// //       res.status(StatusCode.CREATED).json(appointment);
// //     } catch (error: any) {
// //       if (error?.name === "ZodError") {
// //         res.status(StatusCode.BAD_REQUEST).json({
// //           message: error.errors.map((e: any) => e.message).join(", "),
// //         });
// //         return;
// //       }

// //       res
// //         .status(StatusCode.INTERNAL_SERVER_ERROR)
// //         .json({ message: error.message || StatusMessage.INTERNAL_SERVER_ERROR });
// //     }
// //   }
// // }






// import { Request, Response, NextFunction } from "express";
// import { IAppointmentController } from "../interface/IAppointmentController";
// import { IAppointmentService } from "../../services/interface/IAppointmentService";
// import { appointmentSchema } from "../../validations/appointment.schema";
// import { StatusCode } from "../../constants/statusCode.enum";
// import { StatusMessage } from "../../constants/statusMessage";
// import { verifyAccessToken } from "../../middlewares/auth.middleware"; // ✅ custom req type

// export class AppointmentController implements IAppointmentController {
//   constructor(private  _appointmentService: IAppointmentService) {}

//   async createAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       const userId = req.user?.id;
//       if (!userId) {
//         res.status(StatusCode.UNAUTHORIZED).json({ message: StatusMessage.UNAUTHORIZED });
//         return;
//       }

//       // Validate request body and attach userId
//       const validatedData = appointmentSchema.parse({
//         ...req.body,
//         userId,
//       });

//       // Create appointment
//       const appointment = await this._appointmentService.createAppointment(validatedData);

//       res.status(StatusCode.CREATED).json(appointment);
//     } catch (error: any) {
//       if (error?.name === "ZodError") {
//         res.status(StatusCode.BAD_REQUEST).json({
//           message: error.errors.map((e: any) => e.message).join(", "),
//         });
//         return;
//       }

//       res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
//         message: error.message || StatusMessage.INTERNAL_SERVER_ERROR,
//       });
//     }
//   }
// }




import  { Request, Response, NextFunction } from "express";
import { IAppointmentController } from "../interface/IAppointmentController";
import { IAppointmentService } from "../../services/interface/IAppointmentService";
import { appointmentSchema } from "../../validations/appointment.schema";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";
import mongoose from "mongoose";

export class AppointmentController implements IAppointmentController {
  constructor(private readonly _appointmentService: IAppointmentService) {}

  async createAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id; // extracted from token
      if (!userId) {
        res.status(StatusCode.UNAUTHORIZED).json({ message: StatusMessage.UNAUTHORIZED });
        return;
      }

      // validate input using zod schema
      const validatedData = appointmentSchema.parse({
        ...req.body,
        userId,
      });

      // Convert string IDs to ObjectId
      const appointment = await this._appointmentService.createAppointment({
        userId: new mongoose.Types.ObjectId(validatedData.userId),
        doctorId: new mongoose.Types.ObjectId(validatedData.doctorId),
        date: validatedData.date,
        time: validatedData.time,
        transactionId: validatedData.transactionId
          ? new mongoose.Types.ObjectId(validatedData.transactionId)
          : undefined,
      });

      res.status(StatusCode.CREATED).json(appointment);
    } catch (error: any) {
      if (error?.name === "ZodError") {
        res.status(StatusCode.BAD_REQUEST).json({
          message: error.errors.map((e: any) => e.message).join(", "),
        });
        return;
      }

      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message || StatusMessage.INTERNAL_SERVER_ERROR });
    }
  }
}
