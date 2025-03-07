"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Order } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import StripePayment from "./stripe_payment";
import {
  createPaypalOrder,
  approvePaypalOrder,
  updateOrderToPaidByCOD,
  updateOrderToDelivered,
} from "@/lib/actions/order.actions";
import { toast } from "sonner";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
const OrderDetailsDisplay = ({
  order,
  paypalClientId,
  isAdmin,
  stripeClientSecret,
}: {
  order: Omit<Order, "paymentResult">;
  paypalClientId: string;
  isAdmin: boolean;
  stripeClientSecret: string | null;
}) => {
  const {
    shippingAddress,
    orderitems,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    paidAt,
    deliveredAt,
    isDelivered,
  } = order;
  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();

    let status = "";
    if (isPending) {
      status = "Loading PayPal...";
    } else if (isRejected) {
      status = "Failed to load PayPal";
    }
    console.log(paypalClientId);
    return status;
  };

  const handleCreatePaypalOrder = async () => {
    const res = await createPaypalOrder(order.id);
    if (!res.success) {
      toast.error(res.message);
    }
    return res.data;
  };

  const handleApprovePaypalOrder = async (data: { orderID: string }) => {
    const res = await approvePaypalOrder(order.id, data);
    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
  };

  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition();
    return (
      <Button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidByCOD(order.id);
            if (!res.success) {
              toast.error(res.message);
            } else {
              toast.success(res.message);
            }
          })
        }>
        {isPending ? "Processing..." : "Mark as Paid"}
      </Button>
    );
  };
  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition();
    return (
      <Button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToDelivered(order.id);
            if (!res.success) {
              toast.error(res.message);
            } else {
              toast.success(res.message);
            }
          })
        }>
        {isPending ? "Processing..." : "Mark as Delivered"}
      </Button>
    );
  };

  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(order.id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-4-y overflow-x-auto ">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p className="mb-2">{paymentMethod}</p>
              {isPaid ? (
                <Badge variant="secondary">
                  Paid at {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Paid</Badge>
              )}
            </CardContent>
          </Card>
          <Card className="my-2">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p className="mb-2">
                {shippingAddress.streetAddress},{shippingAddress.city}
                {shippingAddress.postalCode},{shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge variant="secondary">
                  Delivered on {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Delivered</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4"></h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderitems.map((order) => {
                    return (
                      <TableRow key={order.slug}>
                        <TableCell>
                          <Link
                            href={`/product/${order.slug}`}
                            className="flex items-center">
                            <Image
                              src={order.image}
                              alt={order.name}
                              width={50}
                              height={50}
                            />
                            <span className="px-2">{order.name}</span>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <span className="px-2">{order.qty}</span>
                        </TableCell>
                        <TableCell>
                          <span>${order.price}</span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="p-4 gap-4 space-y-4">
              <div className="flex justify-between">
                <div>Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>
              {/* Paypal Payment */}
              {!isPaid && paymentMethod === "Paypal" && (
                <div>
                  <PayPalScriptProvider
                    options={{
                      clientId: paypalClientId,
                      currency: "AUD",
                    }}>
                    <PrintLoadingState />
                    <PayPalButtons
                      createOrder={handleCreatePaypalOrder}
                      onApprove={handleApprovePaypalOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
              {/* Stripe Payment */}
              {!isPaid && paymentMethod === "Stripe" && stripeClientSecret && (
                <StripePayment
                  priceInCents={Number(order.totalPrice) * 100}
                  orderId={order.id}
                  clientSecret={stripeClientSecret}
                />
              )}
              {/* Cash on Delivery */}
              {isAdmin && !isPaid && paymentMethod === "CashOnDelivery" && (
                <MarkAsPaidButton />
              )}
              {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default OrderDetailsDisplay;
