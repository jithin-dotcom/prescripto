

import { ICallLog } from "../../models/VideoCall/ICallLog";
import { ICallLogRepository } from "../../repositories/interface/ICallLogRepository";

export class CallLogService {
  constructor(private _callLogRepo: ICallLogRepository) {}

  async logCall(data: Partial<ICallLog>): Promise<ICallLog> {
    return await this._callLogRepo.createLog(data);
  }
}
