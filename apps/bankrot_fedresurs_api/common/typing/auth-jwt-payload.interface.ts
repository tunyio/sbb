export interface AuthJwtPayload {
  expirationUnixTime: number;
  sub: number;
  login: string;
  isAdmin: boolean;
}
