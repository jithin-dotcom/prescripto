

import { ICallLog } from "../../models/VideoCall/ICallLog";
import { ICallLogRepository } from "../../repositories/interface/ICallLogRepository";
import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";

export class CallLogService {
  constructor(
    private _callLogRepo: ICallLogRepository,
    private _appointmentRepo: IAppointmentRepository,
  ) {}

  async logCall(data: Partial<ICallLog>): Promise<ICallLog> {
    try {
      const appointmentId = data.appointmentId;
      if(!appointmentId){
        throw new Error("AppointmentId missing");
      }
      if(data.callStatus === "completed"){
         await this._appointmentRepo.updateById(appointmentId,{status:"completed"});
      }
      return await this._callLogRepo.createLog(data);
    } catch (error) {
      throw error
    }
    
  }
}
