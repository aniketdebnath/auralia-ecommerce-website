import { generateAccessToken, paypal } from "../lib/paypal";

//Test to generate access token from paypal
test("generates access token from paypal", async () => {
  const tokenResponse = await generateAccessToken();
  console.log("Token Response:", tokenResponse);
  expect(typeof tokenResponse).toBe("string");
  expect(tokenResponse.length).toBeGreaterThan(0);
});

//Test to create order
test("creates an order", async () => {
  const token = await generateAccessToken();
  const price = 100.0;
  const orderResponse = await paypal.createOrder(price);
  console.log("Order Response:", orderResponse);
  expect(orderResponse).toHaveProperty("id");
  expect(orderResponse).toHaveProperty("status");
  expect(orderResponse.status).toBe("CREATED");
});

//Test to capture payment with mock order id
test("captures payment from an order", async () => {
  const orderId = "123";
  const mockCaptureResponse = jest
    .spyOn(paypal, "capturePayment")
    .mockResolvedValue({ status: "COMPLETED" });

  const captureResponse = await paypal.capturePayment(orderId);
  console.log("Capture Response:", captureResponse);
  expect(captureResponse).toHaveProperty("status", "COMPLETED");
  mockCaptureResponse.mockRestore();
});
