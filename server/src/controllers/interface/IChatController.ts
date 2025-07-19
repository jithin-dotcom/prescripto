

import { Request, Response, NextFunction } from "express";

export interface IChatController {
   getChatMessages(req: Request, res: Response, next: NextFunction): Promise<void>;
}

