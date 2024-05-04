import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export class MyRequest extends Request{
    user:JwtPayload
}