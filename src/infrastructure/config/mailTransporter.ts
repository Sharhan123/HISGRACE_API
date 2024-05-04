import nodemailer from 'nodemailer';
require('dotenv').config(); 


export const mailTransporter = nodemailer.createTransport({
    // port for secure SMTP
  
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Port for secure SMTP
  tls: { rejectUnauthorized: false },
    requireTLS:true,
      auth: {
          user: process.env.EMAIL,
          pass:process.env.PASSWORD
        }
});