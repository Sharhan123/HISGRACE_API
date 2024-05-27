import { sendMail } from "../interfaces/sendMailer";
import { mailTransporter } from "../infrastructure/config/mailTransporter";
import { getOTPTemplate } from "../infrastructure/helperFunctions/getOtpTemplate";
import { SentMessageInfo } from "nodemailer";
import { getDriverVerification } from "../infrastructure/helperFunctions/getDriverTemplate";
import { rejectedTemplate } from "../infrastructure/helperFunctions/rejctedTemplate";
import { approvedTemplate } from "../infrastructure/helperFunctions/approvedTemplate";
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
    sendDriverOtp(email: string, otp: number,name:string): void {
        console.log('trying to sent');
        
        const template = getDriverVerification(otp,name)

        const details = {
            from: 'subac172@gmail.com',
            to: email,
            subject: "Hisgrace Driver Registration verification",
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
    sendRequestMail(email:string,name:string,status:string):void{
        console.log('trying to send');
        let template
        if(status === 'rejected'){

            template = rejectedTemplate(name)
        }else{
            template = approvedTemplate(name)
        }

        const details = {
            from: 'subac172@gmail.com',
            to: email,
            subject: "Hisgrace Driver Registration Approved",
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