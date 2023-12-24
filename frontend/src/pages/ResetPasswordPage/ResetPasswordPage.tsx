import { Navbar } from "@/components/ui/navbar"
import { ResetPasswordForm } from "./components/ResetPasswordForm"


export const ResetPasswordPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start gap-2 text-center basis-3/4 pt-40">
        <h1 className="text-3xl font-bold text-center">Reset Password</h1>
        <div className="w-full min-w-[300px] max-w-[350px]">
          <ResetPasswordForm />
        </div>
      </div>
    </>
  )
}
