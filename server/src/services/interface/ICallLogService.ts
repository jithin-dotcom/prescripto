
import { ICallLog } from "../../models/VideoCall/ICallLog"
import { IWallet } from "../../models/wallet/IWallet";
import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";
import { WalletDTO, WalletHistoryInputDTO } from "../../utils/reverseMapper/callLogService/ICallLogService";



export interface ICallLogService {
     logCall(data: Partial<ICallLog>): Promise<void>;
    //  paymentDoctor(data: Partial<IWallet>): Promise<IWallet>;
     paymentDoctor(data: Partial<WalletDTO>): Promise<WalletDTO>;
    //  doctorPaymentHistory(data: Partial<IWalletHistory>): Promise<IWalletHistoryDTO>
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