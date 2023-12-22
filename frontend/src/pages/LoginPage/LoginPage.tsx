import { LoginForm } from "./components/LoginForm"
import Todo_Icon from '/images/todo_icon.png'

export const LoginPage = () => {
  return (
    <div className="flex flex-col gap-10 pt-6 items-center justify-center w-full h-[calc(100dvh)]">
      <div className="flex items-center basis-1/4">
        <img src={Todo_Icon} alt="Logo" className="w-60 md:w-72" />
      </div>
      <div className="flex flex-col items-center justify-start gap-2 text-center basis-3/4">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <div className="w-full min-w-[300px] max-w-[350px]">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
