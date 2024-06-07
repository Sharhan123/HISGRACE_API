"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailSender = void 0;
const mailTransporter_1 = require("../infrastructure/config/mailTransporter");
const getOtpTemplate_1 = require("../infrastructure/helperFunctions/getOtpTemplate");
const getDriverTemplate_1 = require("../infrastructure/helperFunctions/getDriverTemplate");
const rejctedTemplate_1 = require("../infrastructure/helperFunctions/rejctedTemplate");
const approvedTemplate_1 = require("../infrastructure/helperFunctions/approvedTemplate");
class mailSender {
    sendOTP(email, otp, name) {
        console.log('trying to sent');
        const template = (0, getOtpTemplate_1.getOTPTemplate)(otp, name);
        const details = {
            from: 'subac172@gmail.com',
            to: email,
            subject: "Hisgrace OTP verification",
            html: template
        };
        mailTransporter_1.mailTransporter.sendMail(details, (err, info) => {
            if (err) {
                console.error('otp', err);
            }
            else {
                console.log('Email sent successfully:', info);
            }
        });
    }
    sendDriverOtp(email, otp, name) {
        console.log('trying to sent');
        const template = (0, getDriverTemplate_1.getDriverVerification)(otp, name);
        const details = {
            from: 'subac172@gmail.com',
            to: email,
            subject: "Hisgrace Driver Registration verification",
            html: template
        };
        mailTransporter_1.mailTransporter.sendMail(details, (err, info) => {
            if (err) {
                console.error('otp', err);
            }
            else {
                console.log('Email sent successfully:', info);
            }
        });
    }
    sendRequestMail(email, name, status) {
        console.log('trying to send');
        let template;
        if (status === 'rejected') {
            template = (0, rejctedTemplate_1.rejectedTemplate)(name);
        }
        else {
            template = (0, approvedTemplate_1.approvedTemplate)(name);
        }
        const details = {
            from: 'subac172@gmail.com',
            to: email,
            subject: "Hisgrace Driver Registration Approved",
            html: template
        };
        mailTransporter_1.mailTransporter.sendMail(details, (err, info) => {
            if (err) {
                console.error('otp', err);
            }
            else {
                console.log('Email sent successfully:', info);
            }
        });
    }
}
exports.mailSender = mailSender;
