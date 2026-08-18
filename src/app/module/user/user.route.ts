import { Router } from "express";
import { UserController } from "./user.controller";
import { upload } from "../../lib/multer";

const router = Router();

router.patch(
  "/profile-image",
  upload.single("profileImage"),
  UserController.uploadProfileImage,
);

export const userRoutes = router;

// Dalam bahasa Inggris, kita bilang, “Kamu spesial bagiku.
// Dalam puisi, kita bilang, Ada beberapa orang yang datang ke dalam hidupmu dengan tenang, namun entah bagaimana, mereka mengubah seluruh duniamu.🤍;
