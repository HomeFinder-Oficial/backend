export interface ITokenService {
  generateToken(payload: any): Promise<string>;
  verifyToken(token: string): Promise<any>;
}

export const TOKEN_SERVICE = 'TOKEN_SERVICE';
