


import { IConcern } from "../../models/concern/IConcern";
import { IConcernRepository } from "../../repositories/interface/IConcernRepository";
import { IConcernService } from "../interface/IConcernService";

export class ConcernService implements IConcernService {
    constructor(
        private _concernRepo: IConcernRepository, 
    ){}

    async createConcern(data: Partial<IConcern>): Promise<{success: true}> {
        try {
            
            if(!data.appointmentId || !data.userId || !data.doctorId || !data.title || !data.description){
                throw new Error("Data is missing");
            }
            if(data.description.trim().length < 10){
                throw new Error("Description should have at least 10 letters");
            }
            const existing = await this._concernRepo.findOne({appointmentId: data.appointmentId});
            if(existing){
                throw new Error("You have already raised Concern for this appointment");
            }
            await this._concernRepo.create(data);
            return {success: true};
        } catch (error) {
            if(error instanceof Error){
                throw error;
            }else{ 
                throw new Error("Something went wrong in creating concern");
            }
        }
    }


    async getAllConcerns(page: number, limit: number): Promise<{ data: IConcern[]; total: number; page: number; pages: number }> {
    try {
      if (page < 1 || limit < 1) {
        throw new Error("Invalid page or limit value");
      }
      const { data, total } = await this._concernRepo.findAllConcern(page, limit);
      const pages = Math.ceil(total / limit);
      return { data, total, page, pages };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Something went wrong while fetching concerns");
      }
    }
  }



}