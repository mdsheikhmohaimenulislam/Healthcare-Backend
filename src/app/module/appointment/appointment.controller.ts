import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookAppointmentService } from "./appointment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const bookAppointment = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user!;

  const result = await bookAppointmentService.bookAppointment(payload, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result,
  });
});


// const apyAppointment = catchAsync()




const bookAppointmentCallBack = catchAsync(
  async (req: Request, res: Response) => {
    const { executedPaymentResult, redirectUrl } =
      await bookAppointmentService.bookAppointmentCallback(req.query);

    res.redirect(redirectUrl);

    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: "User profile fetched successfully",
    //   data: result,
    // });
  },
);

export const AppointmentController = {
  bookAppointment,
  bookAppointmentCallBack,
};
