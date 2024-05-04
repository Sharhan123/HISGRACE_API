import { Schema } from "mongoose";
type ID = Schema.Types.ObjectId

export interface ItempUserReq {
    name: String,
    otp: Number,
    email: String,
    password: String
}

export interface ItempUserRes {
    _id: ID,
    userAuth: String,
    name: String,
    otp: Number,
    email: String,
    password: String
}