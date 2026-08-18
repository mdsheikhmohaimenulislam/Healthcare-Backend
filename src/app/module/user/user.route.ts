import { Router } from "express";
import { UserController } from "./user.controller";
import { upload } from "../../lib/multer";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.patch(
  "/profile-image",
  auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR, Role.PATIENT),
  upload.single("profileImage"),
  UserController.uploadProfileImage,
);

export const userRoutes = router;

// Dalam bahasa Inggris, kita bilang, “Kamu spesial bagiku.
// Dalam puisi, kita bilang, Ada beberapa orang yang datang ke dalam hidupmu dengan tenang, namun entah bagaimana, mereka mengubah seluruh duniamu.🤍;
