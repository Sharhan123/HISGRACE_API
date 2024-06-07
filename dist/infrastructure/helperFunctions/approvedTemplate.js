"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approvedTemplate = void 0;
function approvedTemplate(name) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>One-Time Password (OTP)</title>
    </head>
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">HISGRACE CABS</a>
    </div>
    <p style="font-size:1.1em">Hello MR. ${name},</p>
    <p style="color:green">The request for driver registration of MR.${name} has been approved Welcome to HISGRACE CABS</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: green;border-radius: 4px;">Approved Registration</h2>
    <p style="font-size:0.9em;">Regards,<br />HISGRACE CABS</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>HISGRACE CABS</p>
      <p>Kerala,India.</p>
    </div>
  </div>
</div>
    </html>
    `;
}
exports.approvedTemplate = approvedTemplate;
