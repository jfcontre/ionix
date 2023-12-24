import { useNavigate } from "react-router-dom";
import { LogOutNavBar } from "./log-out-navbar";
import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className="border-b ">
      <div className="flex h-16 items-center px-4 container">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>Todo App</h1>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <LogOutNavBar />
        </div>
      </div>
    </div>
  )
}