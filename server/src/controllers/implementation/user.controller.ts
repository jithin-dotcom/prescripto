

import { Request, Response, NextFunction } from "express"
import { IUserService } from "../../services/interface/IUserService"
import { IUserController } from "../interface/IUserController"
import {uploadToCloudinary} from "../../config/cloudinary";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";

export class UserController implements IUserController {
    constructor (private _userService: IUserService){}

    async getTopDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this._userService.getTopDoctors();
            res.status(StatusCode.OK).json({message: StatusMessage.OK, data: result});
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
       const sort = (req.query.sortBy as string) || "createdAt";
       const specialty = (req.query.specialty as string) || "";
      //  console.log("req.query : ", req.query);
       const result = await this._userService.getAllDoctors(page, limit, search, sort, specialty);

       res.status(StatusCode.OK).json({
         message: StatusMessage.OK,
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
            res.status(StatusCode.OK).json({message: StatusMessage.OK, data: result});
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
          res.status(StatusCode.BAD_REQUEST).json({ success: false, message: StatusMessage.MISSING_DATA });
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
    
        res.status(StatusCode.OK).json({
          success: true,
          data,
        });
      } catch (err) {
        next(err);
      }

    }


    async changePassword(req: Request, res: Response, next: NextFunction): Promise<void>{
      try {
        console.log("entered into changePassword controller");
        const {password, newPassword} = req.body;
        const userId = req.user?.id;
        if(!userId){
           res.status(StatusCode.UNAUTHORIZED).json(StatusMessage.UNAUTHORIZED);
           return;
        }

         if(!password || !newPassword){
             res.status(StatusCode.BAD_REQUEST).json("Password or newPassword missing");
             return;
          }

        await this._userService.changePassword(userId, password, newPassword);
        console.log("changed password successfully");
        res.status(StatusCode.OK).json({message: "Password changed successfully"});
      }catch (error) {
         next(error);
      }
    }


    async changeEmail(req: Request, res: Response, next: NextFunction):Promise<void>{
       try {
        console.log("entered into controller");
          const {password, newEmail} = req.body;
          const userId = req.user?.id;

          if(!userId){
             res.status(StatusCode.UNAUTHORIZED).json(StatusMessage.UNAUTHORIZED);
             return;
          }

          if(!password || !newEmail){
             res.status(StatusCode.BAD_REQUEST).json("Password or Email missing");
             return;
          }

          await this._userService.changeEmail(userId, password, newEmail);
          res.status(StatusCode.OK).json({message: "Email updated successfully"});
        
       }catch (error) {
          next(error);
       }
    }
}