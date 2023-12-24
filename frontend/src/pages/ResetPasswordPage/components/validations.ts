import { ValidationRules } from "@/models/Form";

export const passwordValidation: ValidationRules = {
  required: "Password is required",
  validate: {
    length: (value) => value.length >= 6 || "Password must be at least 6 characters long",
  }
};

export const confirmPasswordValidation = (password:any) => {
  return {
    validate: (value:any) => value === password.current || "Passwords are not the same"
  };
};
