
import { Request, Response, NextFunction } from "express";
import { IDoctorProfileController } from "../interface/IDoctorProfileController";
import { IDoctorProfileService } from "../../services/interface/IDoctorService";
import { doctorProfileSchema } from "../../validations/doctorProfile.schema";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";


export class DoctorProfileController implements IDoctorProfileController {
    constructor (private _doctorProfileService: IDoctorProfileService){};

    async createProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
       try{
           const { doctorId } = req.params;

           const validatedData = doctorProfileSchema.parse({
               ...req.body,
               doctorId
           });

           const profile = await this._doctorProfileService.createDoctorProfile(doctorId, validatedData);
           res.status(StatusCode.CREATED).json(profile);

       }catch (error: any) {
           if (error?.name === "ZodError") {
               res.status(StatusCode.BAD_REQUEST).json({
                   message: error.errors.map((e: any) => e.message).join(", ")
               });
               return;
           }

           res.status(StatusCode.BAD_REQUEST).json({ message: error.message || "Failed to create profile" });
      }
    }



    
    async editProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
      try{
        const { doctorId } = req.params;
        if(!doctorId){
            res.send(StatusCode.BAD_REQUEST).json({ message: StatusMessage.MISSING_ID});
            return;
        }
        const validatedData = doctorProfileSchema.partial().parse(req.body); 
        const updated = await this._doctorProfileService.editDoctorProfile(doctorId, validatedData);
        res.status(StatusCode.OK).json(updated);
      }catch (error: any) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message || "Error updating profile" });
      }
    }

    async deleteProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
        const { doctorId } = req.params;
        if(!doctorId){
            res.send(StatusCode.BAD_REQUEST).json({message: StatusMessage.MISSING_ID});
        }
        await this._doctorProfileService.deleteDoctorProfile(doctorId);
        res.status(StatusCode.NO_CONTENT).json({message: StatusMessage.NO_CONTENT});
     }catch (error: any) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message: error.message || StatusMessage.INTERNAL_SERVER_ERROR});
     }

    }
    
    async findDoctorWithRating(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this._doctorProfileService.findDoctorProfileWithRatings();
            if(!response){
                res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message: "Doctors not found"});
                return;
            }
            
            res.status(StatusCode.OK).json(response);
        } catch (error) {
            next(error);
        }
    }
}