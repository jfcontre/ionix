import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/hooks/useAuthStore";
import { ResetPasswordInput } from "@/models/Auth";
import { ValidationRules } from "@/models/Form";
import { Controller, useForm } from "react-hook-form";
import { confirmPasswordValidation, passwordValidation } from "./validations";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const defaultValues: ResetPasswordInput = {
  password: '',
  confirm_password: ''

};
export const ResetPasswordForm = () => {
  const { resetPassword } = useAuthStore();
  const { control, formState: { errors, isSubmitting }, handleSubmit, watch } = useForm({ defaultValues, shouldFocusError: true });
  const navigate = useNavigate()

  const password = useRef({});
  password.current = watch("password", "");

  const onHandleSubmit = async (data: ResetPasswordInput) => {
    await resetPassword(data)
    navigate('/')
  }

  const renderInputField = (name: keyof ResetPasswordInput, label: string, type = 'text', validationRules: ValidationRules) => (
    <div className='flex flex-col items-start'>
      <Label className='pb-2' htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={validationRules}
        render={({ field }) => (
          <Input id={name} type={type} disabled={isSubmitting} placeholder={label} {...field} />
        )}
      />
      {errors[name] && <small className="text-red-500 text-base">{errors[name]?.message}</small>}
    </div>
  );
  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete="off" className="space-y-6 w-full py-10 max-w-[350px]">
      {renderInputField("password", "Password", "password", passwordValidation)}
      {renderInputField("confirm_password", "Confirm Validation", "password", confirmPasswordValidation(password))}
      <Button className="w-full" disabled={isSubmitting}>Save</Button>
    </form>
  )
}
