

import { IDoctorRating } from "../../models/DoctorRating/IDoctorRating";
import { DoctorRatingModel } from "../../models/DoctorRating/doctorRating.models";
import { IDoctorRatingRepository } from "../interface/IDoctorRatingRepository";
import { BaseRepository } from "./base.repositories";


export class DoctorRatingRepository extends BaseRepository<IDoctorRating> implements IDoctorRatingRepository{
    constructor(){
        super(DoctorRatingModel);
    }


}