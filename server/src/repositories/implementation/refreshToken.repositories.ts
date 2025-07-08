

import { RefreshTokenModel } from "../../models/refreshToken/refreshToken.model";
import { IRefreshTokenRepository } from "../interface/IRefreshTokenRepository";

export class RefreshTokenRepository implements IRefreshTokenRepository {
  async create(data: { userId: string; token: string }) {
    return RefreshTokenModel.create(data);
  }

  async findByToken(token: string) {
    return RefreshTokenModel.findOne({ token });
  }

  async deleteByToken(token: string) {
    return RefreshTokenModel.deleteOne({ token });
  }

  async deleteAllForUser(userId: string) {
    return RefreshTokenModel.deleteMany({ userId });
  }
}
