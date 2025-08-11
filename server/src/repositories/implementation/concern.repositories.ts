

import { IConcern, IConcernDocPopulated } from "../../models/concern/IConcern";
import { BaseRepository } from "./base.repositories";
import  mongoose, { FilterQuery } from "mongoose";
import { ConcernModel } from "../../models/concern/concern.models";



export class ConcernRepository extends BaseRepository<IConcern> {
    constructor(){
        super(ConcernModel);
    }
    

  async getConcerns(skip: number, limit: number, query: FilterQuery<IConcern>): Promise<IConcernDocPopulated[]> {
  const result =  this.model
    .find(query)
    .populate("appointmentId userId doctorId")
    .skip(skip)
    .limit(limit)
    .exec();
   return result as unknown as IConcernDocPopulated[];
}

async countConcerns(query: FilterQuery<IConcern>): Promise<number> {
  return this.model.countDocuments(query).exec();
}

  async updateStatusIfPending(id: string | mongoose.Types.ObjectId, status: "resolved" | "rejected"): Promise<IConcern | null> {
     return await this.model.findOneAndUpdate(
       {_id:id,status:"pending"},
       {status},
       {new:true}
     )
  }

}