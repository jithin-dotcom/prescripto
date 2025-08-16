

export interface Transaction {
  _id: string;
  walletId: string;
  appointmentId?: string;
  transactionId?: string;
  amount: number;
  type: "credit" | "debit";
  source: string;
  status: "success" | "pending" | "failed";
  createdAt: string;
}

export interface WalletData {
  userId: string;
  role: string;
  balance: number;
  expense?: number; 
  history: Transaction[];
  totalTransactions: number;
}