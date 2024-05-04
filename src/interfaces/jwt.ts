import { Schema } from "mongoose";

export interface JWT{
    generateAccessToken(id:Schema.Types.ObjectId,role:String):String
    generateRefreshToken(id:Schema.Types.ObjectId,name:String,email:String,role:String):String
    generateRefreshTokenImage(id:Schema.Types.ObjectId,name:String,email:String,image:String,role:String):String
}
