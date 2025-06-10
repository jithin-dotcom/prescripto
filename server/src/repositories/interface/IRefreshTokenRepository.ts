

// interfaces/repositories/IRefreshTokenRepository.ts
export interface IRefreshTokenRepository {
  create(data: { userId: string; token: string }): Promise<any>;
  findByToken(token: string): Promise<any>;
  deleteByToken(token: string): Promise<any>;
  deleteAllForUser(userId: string): Promise<any>;
}
