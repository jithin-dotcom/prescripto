
import { Request, Response, NextFunction } from "express";
import { IPatientProfileController } from "../interface/IPatientProfileController";
import { IPatientProfileService } from "../../services/interface/IPatientService";
import { patientProfileSchema } from "../../validations/patientProfile.schema";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";


export class PatientProfileController implements IPatientProfileController {
    constructor (private _patientProfileService: IPatientProfileService){};

    async createProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
       try{
           const { patientId } = req.params;

           const validatedData = patientProfileSchema.parse({
               ...req.body,
               patientId
           });

           const profile = await this._patientProfileService.createPatientProfile(patientId, validatedData);
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
        const { patientId } = req.params;
        if(!patientId){
            res.send(StatusCode.BAD_REQUEST).json({ message: StatusMessage.MISSING_ID});
            return;
        }
        const validatedData = patientProfileSchema.partial().parse(req.body); 
        const updated = await this._patientProfileService.editPatientProfile(patientId, validatedData);
        res.status(StatusCode.OK).json(updated);
      }catch (error: any) {
        res.status(StatusCode.BAD_REQUEST).json({ message: error.message || "Error updating profile" });
      }
    }


    async deleteProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
        const { patientId } = req.params;
        if(!patientId){
            res.send(StatusCode.BAD_REQUEST).json({message: StatusMessage.MISSING_ID});
        }
        await this._patientProfileService.deletePatientProfile(patientId);
        res.status(StatusCode.NO_CONTENT).json({message: StatusMessage.NO_CONTENT});
      }catch (error: any) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message: error.message || StatusMessage.INTERNAL_SERVER_ERROR});
      }

    }


  async uploadPhoto (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        
        
      const userId = req.user?.id; 
       if (!userId) {
       res.status(StatusCode.UNAUTHORIZED).json({ message: StatusMessage.UNAUTHORIZED });
       return;
      }
      if (!req.file) {
         res.status(StatusCode.BAD_REQUEST).json({ message: "No file uploaded" });
         return;
      }

      const updatedUser = await this._patientProfileService.uploadProfilePhoto(userId, req.file);
      res.status(StatusCode.OK).json({ message: "Photo uploaded", user: updatedUser });
    }catch (error) {
      next(error);
    }
  }

}