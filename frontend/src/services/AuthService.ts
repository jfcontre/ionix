import { endpointsApi } from "@/constants/endpoints";
import { LoginFormInput, ResetPasswordInput } from "@/models/Auth";
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

  /**
  * Allows to reset password
  * @returns A void
  */
  async resetPassword(data: ResetPasswordInput): Promise<void> {
    await apiFetch<void>('POST', endpointsApi.auth.resetPassword, data)
  }
}

export const AuthService = new _AuthService();