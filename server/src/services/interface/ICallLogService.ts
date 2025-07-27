
import { ICallLog } from "../../models/VideoCall/ICallLog"
import { IWallet } from "../../models/wallet/IWallet";
import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";

export interface ICallLogService {
     logCall(data: Partial<ICallLog>): Promise<ICallLog>;
     paymentDoctor(data: Partial<IWallet>): Promise<IWallet>;
     doctorPaymentHistory(data: Partial<IWalletHistory>): Promise<IWalletHistory>
}