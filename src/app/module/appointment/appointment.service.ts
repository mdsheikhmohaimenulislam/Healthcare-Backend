import config from "../../config";
import { getBkashIdToken } from "../../lib/bkash";

const bookAppointment = async () => {
  const bkashIDToken = await getBkashIdToken();
  if (!bkashIDToken) {
    throw new Error("bkash Access token not found!");
  }

  const bkashCreatePaymentResponse = await fetch(
    `${config.bkash_base_url}/tokenized/checkout/create`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: bkashIDToken,
        "X-App-Key": config.bkash_app_key,
      },
      body: JSON.stringify({
        mode: "0011",
        payerReference: "0123456789", //user email or phone number
        callbackURL: `${config.bkash_callback_url}/appointment/book-appointment/payment/callback`,
        amount: "1200",
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "Inv4", // apppointment id
      }),
    },
  );

  const bkashCreatePaymentResult = await bkashCreatePaymentResponse.json();

  console.log({ bkashCreatePaymentResult });

  return bkashCreatePaymentResult;
};

const bookAppointmentCallback = () => {
  return {
    success: true,
  };
};

export const bookAppointmentService = {
  bookAppointment,
  bookAppointmentCallback
};
