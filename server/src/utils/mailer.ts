

import nodemailer from "nodemailer";
import env from "../config/env.config";

export const sendOtpMail = async (email: string, otp: string): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: env.NODEMAILER_EMAIL,
        pass: env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"TeleCare" <yourapp@example.com>',
      to: email,
      subject: "Your OTP Verification Code",
      html: `<p>Your OTP is: <b>${otp}</b></p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    
    console.log("Email sent:", info.messageId);
    console.log("Email response:", info.response);

    return true; 
  } catch (error) {
    console.error("Failed to send email:", error);
    return false; 
  }
};
