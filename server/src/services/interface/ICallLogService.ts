
import { ICallLog } from "../../models/VideoCall/ICallLog"

export interface ICallLogService {
     logCall(data: Partial<ICallLog>): Promise<ICallLog>
}