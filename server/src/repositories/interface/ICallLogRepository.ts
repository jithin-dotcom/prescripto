

import { ICallLog } from "../../models/VideoCall/ICallLog";

export interface ICallLogRepository {
  createLog(log: Partial<ICallLog>): Promise<ICallLog>;
}
