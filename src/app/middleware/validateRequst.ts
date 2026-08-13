import z from "zod";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

export const validationRequst = (zodSchema: z.ZodObject) => {
  return catchAsync((req: Request, res: Response, next: NextFunction) => {
    // const payload  = req.body ? req.body : {}
    const payload = req.body ?? {};

    const result = zodSchema.safeParse(payload);
    console.log(result);

    // if (!result.success) {
    //   return res.status(400).json({
    //     success: result,
    //     message: "Validation Error",
    //     errors: result.error.issues,
    //   });
    // }

    if (!result.success) {
      console.log(result.error.issues);
      throw new Error(result.error.issues[0].message);
    }

    req.body = result.data;

    next();
  });
};
