
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";


export const errorHandler = (err:any, req:Request, res: Response, next: NextFunction)=>{
     logger.error(err);
     console.log("error in middleware : ",err);
     const statusCode = err.statusCode || 500;
     const message = err.message || "Something went wrong";

     res.status(statusCode).json({message});
}