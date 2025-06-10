

import { Request, Response, NextFunction } from "express"
import { IUserService } from "../../services/interface/IUserService"
import { IUserController } from "../interface/IUserController"
import {uploadToCloudinary} from "../../config/cloudinary";



export class UserController implements IUserController {
    constructor (private userService: IUserService){}

    async getTopDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userService.getTopDoctors();
            res.status(200).json({message: "doctors fetched successfully", data: result});
            return;
        } catch (error) {
            next(error);
        }

    }
      async getAllDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userService.getAllDoctors();
            res.status(200).json({message: "doctors fetched successfully", data: result});
            return;
        } catch (error) {
            next(error);
        }

    }

      async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            const result = await this.userService.getProfile(userId);
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
    
        // Handle profile photo update
        const photoFile = (req.files as any)?.photo?.[0];
        if (photoFile) {
          const photoUrl = await uploadToCloudinary(photoFile.buffer, "profile_photos");
          parsedProfileData.photo = photoUrl;
        }
    
        // Handle proof document updates (optional)
        const proofFiles = (req.files as any)?.proofDocument || [];
        const proofUrls = [];
    
        for (const file of proofFiles) {
          const url = await uploadToCloudinary(file.buffer, "proof_documents");
          proofUrls.push(url);
        }
    
        if (proofUrls.length > 0) {
          parsedProfileData.proofDocuments = proofUrls;
        }
    
        const data = await this.userService.updateUserOrDoctor(userId, parsedUserData, parsedProfileData);
    
        res.status(200).json({
          success: true,
          data,
        });
      } catch (err) {
        next(err);
      }
    }
}