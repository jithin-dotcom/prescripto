

import { Request, Response, NextFunction } from "express";
import { IDoctorRatingService } from "../../services/interface/IDoctorRatingService";
import { doctorRatingSchema } from "../../validations/doctorRating.schema";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";


export class DoctorRatingController {
     constructor(
        private _doctorRatingService: IDoctorRatingService,
     ){}

     async rateDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id;
            const {doctorId, appointmentId, rating, review} = req.body;
            if(!doctorId || !appointmentId || !rating || !review || !userId){
                res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
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
}