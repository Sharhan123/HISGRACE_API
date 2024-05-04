import { Schema } from 'mongoose'
import { JWT } from '../interfaces/jwt'
import jwt from 'jsonwebtoken'
import { accessTokenExp, refreshTokenExp } from '../constants/constants'
export class JWTTOKEN implements JWT {
    generateAccessToken(id: Schema.Types.ObjectId,role:String): String {
        const key = process.env.JWT_SECRET

        if (key !== undefined) {
            const exp = Math.floor(Date.now() / 1000) + accessTokenExp
            return jwt.sign({ id,role, exp }, key)
        }
        throw new Error('key not found')
    }
    generateRefreshToken(id: Schema.Types.ObjectId,name:String,email:String,role:String): String {
        const key = process.env.JWT_SECRET

        if (key !== undefined) {  
            const exp = Math.floor(Date.now() / 1000) + refreshTokenExp
            return jwt.sign({ id,name,email,role, exp }, key);
        }
        throw new Error("key not found")
    }
    generateRefreshTokenImage(id: Schema.Types.ObjectId,name:String,email:String,image:String,role:String): String {
        const key = process.env.JWT_SECRET

        if (key !== undefined) {  
            const exp = Math.floor(Date.now() / 1000) + refreshTokenExp
            return jwt.sign({ id,name,email,image,role, exp }, key);
        }
        throw new Error("key not found")
    }
    generateAdminToken(email:String,role:String):String{
        const key = process.env.JWT_SECRET
        if(key!==undefined){

            const exp = Math.floor(Date.now()/1000) + accessTokenExp
            return jwt.sign({email,role,exp},key)
        }
        throw new Error("Key not found")
    }
    generateTempToken(id: Schema.Types.ObjectId): String {
        const key = process.env.JWT_SECRET
        if (key !== undefined) {

            const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
const exp = currentTimestampInSeconds + (60 * 60);
            return jwt.sign({ id, exp }, key)
        }

        throw new Error('key not found');

    }
}