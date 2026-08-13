import z, { email } from "zod";

const PatientRegisterZodSchema = z.object({
  name: z.string("not a string").min(3).max(6),
  email: z.string(),
  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[0-9]/, "Password must contain atleast 1 Number")
    .regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
  parient: z
    .object({
      contacNumber: z.string().optional(),
    })
    .optional(),
});

const loginZodSchema  = z.object({
  email: z.string(),
  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[0-9]/, "Password must contain atleast 1 Number")
    .regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
});

export const UserValidation = {
  PatientRegisterZodSchema,
  loginZodSchema,
};
