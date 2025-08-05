


import mongoose from "mongoose";
import { IConcern } from "../../models/concern/IConcern";
import { IConcernRepository } from "../../repositories/interface/IConcernRepository";
import { IConcernService } from "../interface/IConcernService";
import { FilterQuery } from "mongoose";

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


  


  // async getAllConcerns(page: number, limit: number): Promise<{
  //   data: IConcern[];
  //   total: number;
  //   page: number;
  //   pages: number;
  // }> {
  //   try {
  //     if (page < 1 || limit < 1) {
  //       throw new Error("Invalid page or limit value");
  //     }

  //     const skip = (page - 1) * limit;

  //     const [data, total] = await Promise.all([
  //       this._concernRepo.getConcerns(skip, limit),
  //       this._concernRepo.countConcerns()
  //     ]);

  //     const pages = Math.ceil(total / limit);

  //     return { data, total, page, pages };
  //   } catch (error) {
  //     throw error instanceof Error ? error : new Error("Something went wrong while fetching concerns");
  //   }
  // }







  async getAllConcerns(page: number, limit: number, search: string, status: string): Promise<{
  data: IConcern[];
  total: number;
  page: number;
  pages: number;
}> {
  try {
    if (page < 1 || limit < 1) {
      throw new Error("Invalid page or limit value");
    }

    const skip = (page - 1) * limit;

    
    // let query: any = {};
     let query: FilterQuery<IConcern> = {};
    if (search) {
      query.$or = [
        { "title": { $regex: search, $options: "i" } },
        { "description": { $regex: search, $options: "i" } },
        { "doctorName": { $regex: search, $options: "i" } }
      ];
    }

    if (status && status !== "all") {
      query.status = status;
    }

    const [data, total] = await Promise.all([
      this._concernRepo.getConcerns(skip, limit, query),
      this._concernRepo.countConcerns(query)
    ]);

    const pages = Math.ceil(total / limit);

    return { data, total, page, pages };
  } catch (error) {
    throw error instanceof Error ? error : new Error("Something went wrong while fetching concerns");
  }
}






  async changeConcernStatus(id: string, status: "resolved" | "rejected"): Promise<{message: string}> {
     try {
        const concernId = new mongoose.Types.ObjectId(id);
        const updatedConcern = await this._concernRepo.updateStatusIfPending(concernId,status);
        // console.log("updatedConcern : ",updatedConcern);
        if(!updatedConcern){
          throw new Error("Failed to update Status");
        }
        return {message: "Status updated Successfully"};
     } catch (error) {
        if(error instanceof Error){
           throw error;
        }else{
          throw new Error("Something went wrong");
        }
     }
  }


  async getConcernByUser(id: string, role: string, page: number, limit: number,  search: string, status: string): Promise<{
  data: IConcern[];
  total: number;
  page: number;
  pages: number;
}> {


  try {
    if (page < 1 || limit < 1) {
      throw new Error("Invalid page or limit value");
    }

    const skip = (page - 1) * limit;

   
    const userId = new mongoose.Types.ObjectId(id);
    const doctorId = new mongoose.Types.ObjectId(id);
    // let query: any = {};
    let query: FilterQuery<IConcern> = {};
    if(role === "user"){
       query = {userId};
    }else{
       query = {doctorId};
    }
    console.log("role : ",role);
    if (search ) {
      query.$or = [
        { "title": { $regex: search, $options: "i" } },
        { "description": { $regex: search, $options: "i" } },
        { "doctorName": { $regex: search, $options: "i" } }
      ];
    }

    if (status && status !== "all") {
      query.status = status;
    }

    const [data, total] = await Promise.all([
      this._concernRepo.getConcerns(skip, limit, query),
      this._concernRepo.countConcerns(query)
    ]);

    const pages = Math.ceil(total / limit);

    return { data, total, page, pages };
  } catch (error) {
    throw error instanceof Error ? error : new Error("Something went wrong while fetching concerns");
  }



  }


}