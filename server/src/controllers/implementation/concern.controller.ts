

import { Request, Response, NextFunction } from "express";
import { IConcernService } from "../../services/interface/IConcernService";
import { concernValidationSchema } from "../../validations/concernValidation.schema";
import { IConcern } from "../../models/concern/IConcern";
import { StatusCode } from "../../constants/statusCode.enum";
import { z } from "zod";
import { StatusMessage } from "../../constants/statusMessage";

export class ConcernController {
    constructor(
        private _concernService: IConcernService,
    ){}

    async createConcern( req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log("enter into consern controller");
            const validateData = concernValidationSchema.parse(req.body);
            const data: Partial<IConcern> = {
                appointmentId: validateData.appointmentId,
                doctorId: validateData.doctorId,
                userId: validateData.userId,
                title: validateData.title,
                description: validateData.description,  
            }
            console.log("data : ",data);
            const response = await this._concernService.createConcern(data);
            if(!response){
                res.status(StatusCode.INTERNAL_SERVER_ERROR).json(StatusMessage.INTERNAL_SERVER_ERROR);
                return;
            }
            res.status(StatusCode.OK).json(StatusMessage.OK);

        } catch (error) {
             if (error instanceof z.ZodError) {
                res.status(StatusCode.BAD_REQUEST).json({
                  status: "fail",
                  message: "Validation error",
                  errors: error.errors,
                });
            }else {
                next(error);
            }
        }
    }



    async getAllConcerns(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { data, total, page: currentPage, pages } = await this._concernService.getAllConcerns(page, limit);
      res.status(StatusCode.OK).json({
        status: "success",
        data,
        pagination: {
          total,
          page: currentPage,
          pages,
          limit,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(StatusCode.BAD_REQUEST).json({
          status: "fail",
          message: error.message,
        });
      } else {
        next(error);
      }
    }
  }
}
