export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Auralia";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A modern ecommerce platform built with Next.js";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT = Number(
  process.env.LATEST_PRODUCTS_LIMIT || 4
);
export const SIGN_IN_DEFAULT_VALUES = {
  email: "",
  password: "",
};

export const SIGN_UP_DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SHIPPING_ADDRESS_DEFAULT_VALUES = {
  fullName: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["Paypal", "Stripe", "CashOnDelivery"];

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "Paypal";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const productDefaultValues = {
  name: "",
  slug: "",
  category: "",
  images: [],
  brand: "",
  description: "",
  price: "0",
  stock: 0,
  rating: "0",
  numReviews: "0",
  isFeatured: false,
  banner: null,
};

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(", ")
  : ["user", "admin"];

export const reviewFormDefaultValues = {
  title: "",
  comment: "",
  rating: 0,
};

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";
