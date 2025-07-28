
import { Request, Response, NextFunction } from "express";

export interface IWalletController {
    getWallet(req: Request, res: Response, next: NextFunction):Promise<void>;
}