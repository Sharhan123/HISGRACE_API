import { NextFunction, Request, Response } from "express";
import  jwt, { JwtPayload }  from "jsonwebtoken";

export const authMiddleware = (req:any, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization

     
    if (!authHeader) {  
        return res.status(401).json({ message: 'Access denied. No token provided.',role:'token'  });
    }
    const token = authHeader.split(' ')[1];

  try {
    const jwtSecret = process.env.JWT_SECRET
    if(jwtSecret){

        const decoded = jwt.verify(token,jwtSecret) as JwtPayload
        req.user = decoded;  
        next();
    }
  } catch (error) { 
    return res.status(401).json({ message: 'Your token is invalid please login again',role:'token' });
  }
}