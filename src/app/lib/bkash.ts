import config from "../config";

export const getBkashIdToken = async () => {
  const response = await fetch(
    `${config.bkash_base_url}/tokenized/checkout/token/grant`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        username: config.bkash_username,
        password: config.bkash_password,
      },
      body: JSON.stringify({
        app_key: config.bkash_app_key,
        app_secret: config.bkash_app_secret,
      }),
    },
  );

  console.log("bKash status:", response.status);
  console.log("bKash content-type:", response.headers.get("content-type"));

  const result = await response.json();

  console.log("bKash raw response:", result);
  return result;
};
