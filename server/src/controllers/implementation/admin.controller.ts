
import { Request, Response, NextFunction } from "express";
import { IAdminController } from "../interface/IAdminController";
import { IAdminService } from "../../services/interface/IAdminService";
import {uploadToCloudinary} from "../../config/cloudinary";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";


export class AdminController implements IAdminController {
    constructor(private _adminService: IAdminService){}

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
          let userId = req.params.id;
          
          if(!userId){
             res.status(StatusCode.BAD_REQUEST).json({message: "userId is missing"});
             return;
          }
          const result = await this._adminService.getUserById(userId);
          res.status(StatusCode.OK).json({message: StatusMessage.OK, data: result});
          return;
       } catch (error) {
          next(error);
       }
    }

    async getAllUser(req: Request, res: Response, next: NextFunction): Promise<void>{
      try {
        const result = await this._adminService.getAllUsers();
        res.status(StatusCode.OK).json(result);
      }catch (error) {
        next(error);
      }
    }



    async getUsersByRole(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
       let role = req.query.role as string;
       if (!role) role = "user"; 

   
       let page = parseInt(req.query.page as string) || 1;
       let limit = parseInt(req.query.limit as string) || 10;
       let search = typeof req.query.search === "string" ? req.query.search : "";
       let specialty = typeof req.query.specialty === "string" ? req.query.specialty : "";
       console.log("limit : ", limit);

       if (page < 1) page = 1;
       if (limit < 1) limit = 10;

       const result = await this._adminService.getAllByRole(role, page, limit, search, specialty);

       res.status(StatusCode.OK).json({
         success: true,
         message: `${role.charAt(0).toUpperCase() + role.slice(1)}s fetched successfully`,
         data: result,
       });
     }catch (error) {
       next(error);
     }
   }




async createUserOrDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
  
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

    parsedProfileData.proofDocuments = proofUrls;

    const result = await this._adminService.createUserOrDoctor({
      userData: parsedUserData,
      profileData: parsedProfileData,
    });

    res.status(StatusCode.CREATED).json({
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

    const message = await this._adminService.updateUserOrDoctor(userId, parsedUserData, parsedProfileData);

    res.status(StatusCode.OK).json({
      success: true,
      message,
    });
  }catch (error) {
    next(error);
  }
}


async deleteUserOrDoctor(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.id;

    const result = await this._adminService.deleteUserOrDoctor(userId);

    res.status(StatusCode.OK).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
    
  }
}


async toggleBlockUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
       const userId = req.params.id;
       const result = await this._adminService.toggleBlockUser(userId);

       res.status(StatusCode.OK).json({
         success: true,
         message: result.message,
         isBlocked: result.isBlocked
       });
       return;
    } catch (error) {
       console.error("Error in toggleBlockUser:", error);
       if(error instanceof Error){
         res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
       }else{
         res.status(StatusCode.INTERNAL_SERVER_ERROR).json({success: false, message: StatusMessage.INTERNAL_SERVER_ERROR});
       }
    }
}


async toggleVerifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
       const userId = req.params.id;
       const result = await this._adminService.toggleVerifyUser(userId);

       res.status(StatusCode.OK).json({
         success: true,
         message: result.message,
         isVerified: result.isVerified
       });
       return;
    } catch (error) {
       console.error("Error in toggleVerifyUser:", error);
       if(error instanceof Error){
         res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
       }else{
         res.status(StatusCode.INTERNAL_SERVER_ERROR).json({success: false, message: StatusMessage.INTERNAL_SERVER_ERROR});
       }
    }
}

}