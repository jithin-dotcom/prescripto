
import { ICallLog } from "../../models/VideoCall/ICallLog"
import { IWallet } from "../../models/wallet/IWallet";
import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";



export interface ICallLogService {
     logCall(data: Partial<ICallLog>): Promise<void>;
     paymentDoctor(data: Partial<IWallet>): Promise<IWallet>;
     doctorPaymentHistory(data: Partial<IWalletHistory>): Promise<IWalletHistoryDTO>
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