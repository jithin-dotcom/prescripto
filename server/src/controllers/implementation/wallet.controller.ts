

import { Request, Response, NextFunction } from "express";
import { IWalletService } from "../../services/interface/IWalletService";
import { IWalletController } from "../interface/IWalletController";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";

export class WalletController implements IWalletController {
    constructor(
        private  _walletService: IWalletService,
    ){}

    // async getWallet(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const userId = req.user?.id;
    //         const role = req.user?.role;
    //         if(!userId || !role){
    //            res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
    //         }

    //         const response = await this._walletService.getWallet(userId as string, role as "user"|"doctor");
    //         res.status(StatusCode.OK).json(response);
    //     } catch (error) {
    //         next(error);
    //     }
    // }





    async getWallet(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;

    if (!userId || !role) {
      res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const response = await this._walletService.getWallet(
      userId as string,
      role as "user" | "doctor",
      page,
      limit
    );

    res.status(StatusCode.OK).json(response);
  } catch (error) {
    next(error);
  }
}

}
