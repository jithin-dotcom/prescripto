
import { Request, Response, NextFunction } from "express";
import { IPatientProfileController } from "../interface/IPatientProfileController";
import { IPatientProfileService } from "../../services/interface/IPatientService";
import { patientProfileSchema } from "../../validations/patientProfile.schema";
import { ZodError } from "zod";


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
           res.status(201).json(profile);

       }catch (error: any) {
           if (error?.name === "ZodError") {
               res.status(400).json({
                   message: error.errors.map((e: any) => e.message).join(", ")
               });
               return;
           }

           res.status(400).json({ message: error.message || "Failed to create profile" });
      }
    }



    
    async editProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
      try{
        const { patientId } = req.params;
        if(!patientId){
            res.send(400).json({ message: "patientId missing"});
            return;
        }
        const validatedData = patientProfileSchema.partial().parse(req.body); 
        const updated = await this._patientProfileService.editPatientProfile(patientId, validatedData);
        res.status(200).json(updated);
      }catch (error: any) {
        res.status(400).json({ message: error.message || "Error updating profile" });
      }
    }

    async deleteProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
        const { patientId } = req.params;
        if(!patientId){
            res.send(400).json({message: "PatientId is missing"});
        }
        await this._patientProfileService.deletePatientProfile(patientId);
        res.status(200).json({message: "patient profile deleted successfully"});
     } catch (error: any) {
        res.status(400).json({message: error.message || "something went wrong"});
     }

    }

     async uploadPhoto (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // console.log("request.user :", req.user);
        
      const userId = req.user?.id; 
       if (!userId) {
       res.status(401).json({ message: "Unauthorized: No user found" });
       return;
    }
      if (!req.file) {
         res.status(400).json({ message: "No file uploaded" });
         return;
      }

      const updatedUser = await this._patientProfileService.uploadProfilePhoto(userId, req.file);
      res.status(200).json({ message: "Photo uploaded", user: updatedUser });
    } catch (error) {
      next(error);
    }
  };

}