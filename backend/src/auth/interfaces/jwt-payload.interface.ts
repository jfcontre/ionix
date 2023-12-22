import { UserWithOutPassword } from "./user-without-password.interface";

export interface JwtPayload {
  user: UserWithOutPassword
}