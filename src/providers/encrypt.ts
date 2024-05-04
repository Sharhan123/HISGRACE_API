import bcrypt from 'bcrypt';
import { hashPassword } from '../interfaces/hashingPassword';

export class encrypting implements hashPassword {
    async encrypt(password: string): Promise<string> {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)

        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    }

    async compare(password: string, hashedPass: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPass)
    }

}