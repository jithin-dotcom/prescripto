export interface RazorpayOrderInput {
  appointmentId: string;
  userId: string;
  doctorId: string;
  amount: number;
}

export interface IRazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export interface IPaymentService {
  createRazorpayOrder(data: RazorpayOrderInput): Promise<IRazorpayOrderResponse>;
  verifyPaymentSignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<{ success: boolean; message: string }>;

  downloadRecept(appointmentId: string): Promise<Buffer>;
  generateReceiptPDF(data: any): Promise<Buffer>;
}
