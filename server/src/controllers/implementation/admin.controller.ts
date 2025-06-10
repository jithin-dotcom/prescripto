
import { Request, Response, NextFunction } from "express";
import { IAdminController } from "../interface/IAdminController";
import { IAdminService } from "../../services/interface/IAdminService";
import { createUserOrDoctorSchema } from "../../validations/createUserOrDoctor.schema";
import {uploadToCloudinary} from "../../config/cloudinary";
import { data } from "react-router-dom";

export class AdminController implements IAdminController {
    constructor(private adminService: IAdminService){}

   


    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
          let userId = req.params.id;
          if(!userId){
             res.status(400).json({message: "userId is missing"});
             return;
          }
          const result = await this.adminService.getUserById(userId);
          res.status(200).json({message: "success", data: result});
          return;
       } catch (error) {
          next(error);
       }
    }


    async getUsersByRole(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let role = req.query.role as string;
    if (!role) role = "user"; 

    let page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || 10;

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const result = await this.adminService.getAllByRole(role, page, limit);

    res.status(200).json({
      success: true,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)}s fetched successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}




async createUserOrDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    console.log("entered into controller");
    console.log("Files:", req.files);
    console.log("request body at admin controller: ", req.body);

    const { userData, profileData } = req.body;
    if (!userData || !profileData) {
      res.status(400).json({ success: false, message: "userData and profileData are required" });
      return;
    }

    const parsedUserData = JSON.parse(userData);
    const parsedProfileData = JSON.parse(profileData);

    // Upload profile photo
    const photoFile = (req.files as any)?.photo?.[0];
    if (photoFile) {
      const photoUrl = await uploadToCloudinary(photoFile.buffer, "profile_photos");
      parsedProfileData.photo = photoUrl;
    }

    // Upload proof documents
    const proofFiles = (req.files as any)?.proofDocument || [];
    const proofUrls = [];

    for (const file of proofFiles) {
      const url = await uploadToCloudinary(file.buffer, "proof_documents");
      proofUrls.push(url);
    }

    parsedProfileData.proofDocuments = proofUrls;

    const result = await this.adminService.createUserOrDoctor({
      userData: parsedUserData,
      profileData: parsedProfileData,
    });

    res.status(201).json({
      success: true,
      message: result.message,
      userId: result.userId,
    });
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

    const message = await this.adminService.updateUserOrDoctor(userId, parsedUserData, parsedProfileData);

    res.status(200).json({
      success: true,
      message,
    });
  } catch (err) {
    next(err);
  }
}


async deleteUserOrDoctor(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.id;

    const result = await this.adminService.deleteUserOrDoctor(userId);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete user/doctor",
    });
  }
}

async toggleBlockUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
       const userId = req.params.id;
       const result = await this.adminService.toggleBlockUser(userId);

       res.status(200).json({
         success: true,
         message: result.message,
         isBlocked: result.isBlocked
       });
       return;
    } catch (error) {
       console.error("Error in toggleBlockUser:", error);
       if(error instanceof Error){
         res.status(500).json({ success: false, message: error.message });
       }else{
         res.status(500).json({success: false, message: "something went wrong"});
       }
    }
}

async toggleVerifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
       const userId = req.params.id;
       const result = await this.adminService.toggleVerifyUser(userId);

       res.status(200).json({
         success: true,
         message: result.message,
         isVerified: result.isVerified
       });
       return;
    } catch (error) {
       console.error("Error in toggleVerifyUser:", error);
       if(error instanceof Error){
         res.status(500).json({ success: false, message: error.message });
       }else{
         res.status(500).json({success: false, message: "something went wrong"});
       }
    }
}

}