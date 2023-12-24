import { User } from "@/models/User";
import { apiFetch } from "../utils/fetch";
import { baseUrl } from "@/constants/baseUrl";

/**
 * The UserService instance.
 */
class _UserService {
  /**
   * Allows to get all users executors
   * @returns 
   */
  async getUsersExecutors(): Promise<User[]> {
    const res = await apiFetch<User[]>('GET', `${baseUrl}/users/getExecutors`)
    return res
  }
}

export const UserService = new _UserService();