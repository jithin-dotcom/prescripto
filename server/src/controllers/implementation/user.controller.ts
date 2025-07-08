

import { Request, Response, NextFunction } from "express"
import { IUserService } from "../../services/interface/IUserService"
import { IUserController } from "../interface/IUserController"
import {uploadToCloudinary} from "../../config/cloudinary";


export class UserController implements IUserController {
    constructor (private _userService: IUserService){}

    async getTopDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this._userService.getTopDoctors();
            res.status(200).json({message: "doctors fetched successfully", data: result});
            return;
        } catch (error) {
            next(error);
        }

    }
   

   async getAllDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
       const page = parseInt(req.query.page as string) || 1;
       const limit = parseInt(req.query.limit as string) || 4;
       const search = (req.query.search as string) || "";
       const sort = (req.query.sort as string) || "createdAt";
       const specialty = (req.query.specialty as string) || "";
       const result = await this._userService.getAllDoctors(page, limit, search, sort, specialty);

       res.status(200).json({
         message: "Doctors fetched successfully",
         data: result.data,
         page: result.page,
         total: result.total,
         totalPages: result.totalPages
       });
     }catch (error) {
       next(error);
     }
   }


    async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            const result = await this._userService.getProfile(userId);
            res.status(200).json({message: "profile fetched successfully", data: result});
            return;
        } catch (error) {
            next(error);
        }

    }


    async updateUserOrDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const userId = req.params.id;
        const { userData, profileData } = req.body;
    
        if (!userData || !profileData) {
          res.status(400).json({ success: false, message: "userData and profileData are required" });
          return;
        }
    
        const parsedUserData = JSON.parse(userData);
        const parsedProfileData = JSON.parse(profileData);
    
        const photoFile = (req.files as any)?.photo?.[0];
        if (photoFile) {
          const photoUrl = await uploadToCloudinary(photoFile.buffer, "profile_photos");
          parsedProfileData.photo = photoUrl;
        }
    
        
        const proofFiles = (req.files as any)?.proofDocument || [];
        const proofUrls = [];
    
        for (const file of proofFiles) {
          const url = await uploadToCloudinary(file.buffer, "proof_documents");
          proofUrls.push(url);
        }
    
        if (proofUrls.length > 0) {
          parsedProfileData.proofDocuments = proofUrls;
        }
    
        const data = await this._userService.updateUserOrDoctor(userId, parsedUserData, parsedProfileData);
    
        res.status(200).json({
          success: true,
          data,
        });
      } catch (err) {
        next(err);
      }
    }
}