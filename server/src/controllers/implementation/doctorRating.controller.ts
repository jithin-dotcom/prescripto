

import { Request, Response, NextFunction } from "express";
import { IDoctorRatingService } from "../../services/interface/IDoctorRatingService";
import { doctorRatingSchema } from "../../validations/doctorRating.schema";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";
import { IDoctorRatingController } from "../interface/IDoctorRatingController";


export class DoctorRatingController implements IDoctorRatingController{
     constructor(
        private _doctorRatingService: IDoctorRatingService,
     ){}

     async rateDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id;
            const {doctorId, appointmentId, rating, review} = req.body;
            if(!doctorId || !appointmentId || !rating  || !userId){
                res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
                return;
            }

            const validate = doctorRatingSchema.parse({
                ...req.body,
                userId,
            })
            const data = {
                userId: validate.userId,
                doctorId: validate.doctorId,
                appointmentId: validate.appointmentId,
                rating: validate.rating,
                review: validate.review,
            }

            await this._doctorRatingService.rateDoctor(data);
            res.status(StatusCode.OK).json(StatusMessage.OK);

        }catch (error) {
            next(error);
        }
     }

   


  async getRatingByDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
   try {
    const { doctorId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!doctorId) {
      res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
      return;
    }

    const response = await this._doctorRatingService.getRatingByDoctor(doctorId, page, limit);

    res.status(StatusCode.OK).json(response);
  } catch (error) {
    next(error);
  }
}






}