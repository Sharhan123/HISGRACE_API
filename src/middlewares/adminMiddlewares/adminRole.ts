import { NextFunction, Request, Response } from "express";

export const adminRole = (req:any, res:Response, next:NextFunction) => {
    const user = req.user 
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' ,role:'token' });
    }
    next();
  };
  
  