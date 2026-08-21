import { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { bookAppointmentService } from "./appointment.service";

const bookAppointment = catchAsync(async (req: Request, res: Response) => {


  const result = await bookAppointmentService.bookAppointment();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile image uploaded successfully",
    data: {},
  });
});

export const AppointmentController = {
  bookAppointment,
};
