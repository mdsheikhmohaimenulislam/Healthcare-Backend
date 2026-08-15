import z from "zod";

const PatientRegisterZodSchema = z.object({
  name: z
    .string("Name must be a string")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter")
    .regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter")
    .regex(/[0-9]/, "Password must contain at least 1 Number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 Special Character",
    ),

  patient: z
    .object({
      contactNumber: z.string().optional(),
    })
    .optional(),
});

const loginZodSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter")
    .regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter")
    .regex(/[0-9]/, "Password must contain at least 1 Number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 Special Character",
    ),
});

const ForgotPasswordZodSchema = z.object({
  email: z.email(),
});

const ResetPasswordZodSchema = z.object({
  email: z.email(),
  newPassword: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")

    .regex(/[0-9]/, "Password must contain atleast 1 Number")
    .regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
  otp: z.string().length(6),
});

export const UserValidation = {
  PatientRegisterZodSchema,
  loginZodSchema,
  ForgotPasswordZodSchema,
  ResetPasswordZodSchema,
};
