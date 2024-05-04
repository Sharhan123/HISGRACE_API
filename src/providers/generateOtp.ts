export class GenerateOtp {
    // To generate a four number otp
    generateOTP(): number {
        return Math.floor(1000 + Math.random() * 9000);
    }
}