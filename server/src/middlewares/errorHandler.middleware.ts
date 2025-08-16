
// import { Request, Response, NextFunction } from "express";
// import logger from "../utils/logger";


// export const errorHandler = (err:any, req:Request, res: Response, next: NextFunction)=>{
//      logger.error(err);
    
//      const statusCode = err.statusCode || 500;
//      const message = err.message || "Something went wrong";

//      res.status(statusCode).json({message});
// }









import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

 
  const statusCode = 500;
  const message =
    err instanceof Error ? err.message : "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
