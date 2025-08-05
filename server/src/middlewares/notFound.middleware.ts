

import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../constants/statusCode.enum";
import { StatusMessage } from "../constants/statusMessage";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCode.NOT_FOUND).json(StatusMessage.NOT_FOUND);
}