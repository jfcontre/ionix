import { createBrowserRouter } from "react-router-dom"
import { LoginPage, TodoPage } from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { ResetPasswordPage } from "@/pages/ResetPasswordPage/ResetPasswordPage";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoute><TodoPage /></ProtectedRoute>)
  },
  {
    path: "/reset-password",
    element: (<ProtectedRoute><ResetPasswordPage /></ProtectedRoute>)
  },
  {
    path: "login",
    element: <PublicRoute><LoginPage /></PublicRoute>
  },
]);