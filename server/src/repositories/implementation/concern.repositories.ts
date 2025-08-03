

import { IConcern } from "../../models/concern/IConcern";
import { BaseRepository } from "./base.repositories";
import  { Document} from "mongoose";
import { ConcernModel } from "../../models/concern/concern.models";


export class ConcernRepository extends BaseRepository<IConcern> {
    constructor(){
        super(ConcernModel);
    }
    
    async findAllConcern(page: number, limit: number): Promise<{ data: IConcern[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      ConcernModel.find()
        .skip(skip)
        .limit(limit)
        .exec(),
      ConcernModel.countDocuments(),
    ]);
    return { data, total };
  }

}