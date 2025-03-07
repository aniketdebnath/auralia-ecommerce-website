import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import { ShippingAddress } from "@/types";
import OrderDetailsDisplay from "./order-details-display";
import { auth } from "@/auth";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetails = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  const session = await auth();
  if (!order) notFound();
  let client_secret = null;
  //Check if the order is not paid and using stripe
  if (order.isPaid === false && order.paymentMethod === "Stripe") {
    //Initialize stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    //Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "AUD",
      metadata: {
        orderId: order.id,
      },
    });
    client_secret = paymentIntent.client_secret;
  }

  return (
    <>
      <OrderDetailsDisplay
        order={{
          ...order,
          shippingAddress: order.shippingAddress as ShippingAddress,
        }}
        paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
        stripeClientSecret={client_secret}
        isAdmin={session?.user?.role === "admin" || false}
      />
    </>
  );
};
export default OrderDetails;
