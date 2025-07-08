
import { Request, Response, NextFunction } from "express";
import { IDoctorProfileController } from "../interface/IDoctorProfileController";
import { IDoctorProfileService } from "../../services/interface/IDoctorService";
import { doctorProfileSchema } from "../../validations/doctorProfile.schema";
import { ZodError } from "zod";


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
        const { doctorId } = req.params;
        if(!doctorId){
            res.send(400).json({ message: "doctorId missing"});
            return;
        }
        const validatedData = doctorProfileSchema.partial().parse(req.body); 
        const updated = await this._doctorProfileService.editDoctorProfile(doctorId, validatedData);
        res.status(200).json(updated);
      }catch (error: any) {
        res.status(400).json({ message: error.message || "Error updating profile" });
      }
    }

    async deleteProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
        const { doctorId } = req.params;
        if(!doctorId){
            res.send(400).json({message: "doctorId is missing"});
        }
        await this._doctorProfileService.deleteDoctorProfile(doctorId);
        res.status(200).json({message: "Doctor profile deleted successfully"});
     } catch (error: any) {
        res.status(400).json({message: error.message || "something went wrong"});
     }

    }

}