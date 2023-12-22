import { endpointsApi } from "@/constants/endpoints";
import { LoginFormInput } from "@/models/Login";
import { UserToken } from "@/models/User";
import { apiFetch } from "@/utils/fetch"

/**
 * The AuthService instance.
 */
class _AuthService {
  /**
   * Allows to login 
   * @returns a information with token and user
   */
  async login(data: LoginFormInput): Promise<UserToken> {
    const response = await apiFetch<UserToken>('POST', endpointsApi.auth.login, data)
    return response
  }
}

export const AuthService = new _AuthService();