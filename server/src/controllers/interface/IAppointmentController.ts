

import { Request, Response, NextFunction } from "express";

export interface IAppointmentController {
  createAppointment(req: Request, res: Response, next: NextFunction): Promise<void>;
}
