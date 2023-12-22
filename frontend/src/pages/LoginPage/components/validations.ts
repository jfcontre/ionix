import { ValidationRules } from "@/models/Form";

export const usernameValidation: ValidationRules = {
  required: "Username is required",
  validate: (value) => value.length >= 3 || "Username must be at least 3 characters long"
};

export const passwordValidation: ValidationRules = {
  required: "Password is required",
  validate: {
    length: (value) => value.length >= 6 || "Password must be at least 6 characters long",
  }
};