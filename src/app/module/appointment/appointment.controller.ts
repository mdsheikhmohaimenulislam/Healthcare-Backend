import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookAppointmentService } from "./appointment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const bookAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await bookAppointmentService.bookAppointment();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result,
  });
});
const bookAppointmentCallBack = catchAsync(
  async (req: Request, res: Response) => {
    const result = await bookAppointmentService.bookAppointmentCallback(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile fetched successfully",
      data: result,
    });
  },
);

export const AppointmentController = {
  bookAppointment,
  bookAppointmentCallBack,
};
