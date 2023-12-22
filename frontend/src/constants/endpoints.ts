import { baseUrl } from "./baseUrl";


export const endpointsApi = {
  todo: {
    base: `${baseUrl}/todos`
  },
  auth: {
    base: `${baseUrl}/auth`,
    login: `${baseUrl}/auth/login`,
  }
}