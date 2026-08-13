import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";
import { UserValidation } from "./auth.validation";
import { validationRequest } from "../../middleware/validateRequst";

const router = Router();

router.post(
  "/register",
  validationRequest(UserValidation.PatientRegisterZodSchema),
  AuthController.registerPatient,
);

router.post(
  "/login",
  validationRequest(UserValidation.loginZodSchema),
  AuthController.loginUser,
);

router.get(
  "/me",
  auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
  //?=================== Validation Requst ===============//
  AuthController.getMe,
);

router.post("/refresh-token", AuthController.refreshToken);
router.post("/google", AuthController.googleLogin);

export const AuthRoutes = router;
