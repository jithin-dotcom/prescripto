


import { ErrorRequestHandler } from "express";
import logger from "../utils/logger";
import { AppError } from "../utils/AppError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  const statusCode = 500;
  const message = err instanceof Error ? err.message : "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
