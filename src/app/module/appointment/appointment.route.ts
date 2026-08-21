import { Router } from "express";
import { AppointmentController } from "./appointment.controller";

const router = Router();

router.post("/book-appointment", AppointmentController.bookAppointment);

//book appointment callback url
router.get(
  "/book-appointment/payment/callback",
  AppointmentController.bookAppointmentCallBack,
);

export const AppointementRoutes = router;
