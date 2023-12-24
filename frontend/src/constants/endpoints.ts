import { baseUrl } from "./baseUrl";


export const endpointsApi = {
  todo: {
    base: `${baseUrl}/todos`,
    startTodo: `${baseUrl}/todos/startTodo`,
    changeStatus: `${baseUrl}/todos/updateStatusTodo`,
    leaveComment: `${baseUrl}/todos/leaveComment`,
  },
  auth: {
    base: `${baseUrl}/auth`,
    login: `${baseUrl}/auth/login`,
    resetPassword: `${baseUrl}/auth/reset-password`,
  }
}