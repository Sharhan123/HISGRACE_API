import { NextFunction, Request, Response } from "express";

export const adminRole = (req:any, res:Response, next:NextFunction) => {
    const user = req.user 
    if (!user || user.role !== 'user') {
      return res.status(403).json({ message: 'Access denied. User role required.' ,role:'token' });
    }
    next();
  };
  
   