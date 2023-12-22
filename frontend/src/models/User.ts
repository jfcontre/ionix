import { UserRole } from "@/constants/enums/authStates"

export interface User {
  id: number
  username: string
  status: string
  role: UserRole
}

export interface UserToken {
  accessToken: string
}

export interface TokenDecode {
  exp: number
  iat: number
  user: User
}