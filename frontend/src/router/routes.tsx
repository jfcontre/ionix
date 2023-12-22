import { createBrowserRouter } from "react-router-dom"
import { LoginPage, TodoPage } from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoute><TodoPage/></ProtectedRoute>)
  },
  {
    path: "login",
    element: <PublicRoute><LoginPage/></PublicRoute>
  },
]);