
import { ICallLog } from "../../models/VideoCall/ICallLog"
import { WalletDTO, WalletHistoryInputDTO } from "../../utils/reverseMapper/callLogService/ICallLogService";



export interface ICallLogService {
     logCall(data: Partial<ICallLog>): Promise<void>;
     paymentDoctor(data: Partial<WalletDTO>): Promise<WalletDTO>;
    doctorPaymentHistory(data: Partial<WalletHistoryInputDTO>): Promise<IWalletHistoryDTO>
}




export interface IWalletHistoryDTO {
  _id: string;
  walletId: string;
  appointmentId: string;
  amount: number;
  type: string;
  source: string;
  status: string;
  transactionId?: string;
  createdAt: Date;
}