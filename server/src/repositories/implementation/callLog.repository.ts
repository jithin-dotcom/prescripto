import { BaseRepository } from "./base.repositories";
import { CallLogModel } from "../../models/VideoCall/callLog.models";
import { ICallLog } from "../../models/VideoCall/ICallLog";
import { Document } from "mongoose";
import { ICallLogRepository } from "../interface/ICallLogRepository";

export class CallLogRepository extends BaseRepository<ICallLog & Document> implements ICallLogRepository {
  constructor() {
    super(CallLogModel);
  }

  async createLog(log: Partial<ICallLog>): Promise<ICallLog> {
    return await this.model.create(log);
  }
}
