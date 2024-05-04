import { sendMail } from "../interfaces/sendMailer";
import { mailTransporter } from "../infrastructure/config/mailTransporter";
import { getOTPTemplate } from "../infrastructure/helperFunctions/getOtpTemplate";
import { SentMessageInfo } from "nodemailer";
export class mailSender implements sendMail{
    sendOTP(email: string, otp: number,name:string): void {
        console.log('trying to sent');
        
        const template = getOTPTemplate(otp,name)

        const details = {
            from: 'subac172@gmail.com',
            to: email,
            subject: "Hisgrace OTP verification",
            html: template
        };

        mailTransporter.sendMail(details, (err: Error | null, info: SentMessageInfo) => {
            if (err) {
                console.error( 'otp',err);
            } else {
                console.log('Email sent successfully:', info);
            }
        });
        
    }
}