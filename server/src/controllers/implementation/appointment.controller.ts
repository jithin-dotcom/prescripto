


import  { Request, Response, NextFunction } from "express";
import { IAppointmentController } from "../interface/IAppointmentController";
import { IAppointmentService } from "../../services/interface/IAppointmentService";
import { appointmentSchema } from "../../validations/appointment.schema";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";



export class AppointmentController implements IAppointmentController {
  constructor(private  _appointmentService: IAppointmentService) {}


async createAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id; 
    if (!userId) {
      res.status(StatusCode.UNAUTHORIZED).json({ message: StatusMessage.UNAUTHORIZED });
      return;
    }

    const validatedData = appointmentSchema.parse({
      ...req.body,
      userId,
    });

    const appointment = await this._appointmentService.createAppointment({
      userId: validatedData.userId,
      doctorId: validatedData.doctorId,
      day: validatedData.date,
      time: validatedData.time,
      transactionId: validatedData.transactionId,
    });

    res.status(StatusCode.CREATED).json(appointment);
  } catch (error) {
    next(error);
  }
}

 async getCreateAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
       
        const { doctorId }= req.params;
        if(!doctorId){
           res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
           return;
        }
        const  result = await this._appointmentService.getCreateAppointment(doctorId);
        res.status(StatusCode.OK).json(result);
     } catch (error) {
        next(error);
     }
 }
  


async getUserAppointments(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 4;
    const status = req.query.status as string || "";

    const result = await this._appointmentService.getAppointmentsByUser(userId, page, limit, status);

    res.status(StatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
}



async getDoctorAppointments(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const doctorId = req.user?.id;
    if (!doctorId) {
      res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = (req.query.status as string) || "";

    const result = await this._appointmentService.getAppointmentsByDoctor(
      doctorId,
      page,
      limit,
      status
    );

    res.status(StatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
}


async getAllAppointments(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string || "";
   
    const result = await this._appointmentService.getAllAppointments(page, limit, status);

    res.status(StatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
}


async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
       const appointmentId = req.params.appointmentId;
       const {status} = req.body;
       
       console.log("status : ",status);
       if(!appointmentId || !status){
          res.status(StatusCode.BAD_REQUEST).json({message: "AppointmentId or Status Missing"});
          return;
       }
       if(!["cancelled","confirmed"].includes(status)){
          res.status(StatusCode.BAD_REQUEST).json({message: "Invalid Status"});
          return;
       }

       await this._appointmentService.updateStatus(appointmentId, status);
       res.status(StatusCode.OK).json({message: `Appointment ${status} successfully`});
      
    }catch (error) {
       next(error);
    }
  }

  async getAppointmentById(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
      
       const { appointmentId } = req.params;
       const doctorId = req.user?.id;
       if(!doctorId){
         res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
         return;
       }
       
       if(!appointmentId){
         res.status(StatusCode.BAD_REQUEST).json({message: "AppointmentId missing"});
         return;
       }
       const result = await this._appointmentService.getAppointmentById(appointmentId, doctorId);
       if(!result){
         res.status(StatusCode.NOT_FOUND).json(StatusMessage.NOT_FOUND);
         return;
       }
       res.status(StatusCode.OK).json(result);
     } catch (error) {
       next(error);
     }
  }

  

}