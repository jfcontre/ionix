import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "@/hooks/useAuthStore";
import { LoginFormInput } from "@/models/Login";
import { ValidationRules } from "@/models/Form";
import { passwordValidation, usernameValidation } from "./validations";

const defaultValues: LoginFormInput = {
  username: '',
  password: ''
};
export const LoginForm = () => {
  const { login } = useAuthStore();
  const { control, formState: { errors, isSubmitting }, handleSubmit } = useForm({ defaultValues, shouldFocusError: true });

  const onHandleSubmit = async (data: LoginFormInput) => await login(data);

  const renderInputField = (name: keyof LoginFormInput, label: string, type = 'text', validationRules: ValidationRules) => (
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
      {renderInputField("username", "Username", 'text', usernameValidation)}
      {renderInputField("password", "Password", "password", passwordValidation)}
      <Button className="w-full" disabled={isSubmitting}>Login</Button>
    </form>
  );
};