import { z } from "zod";
import { formatNumberWithDecimals } from "./utils";
import { PAYMENT_METHODS } from "./constants";

const priceFormat = z
  .string()
  .refine(
    (val) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimals(Number(val))),
    "Price must be a valid number with 2 decimal places"
  );

//Schema for Inserting Products
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters long"),
  slug: z.string().min(3, "Slug must be atleast 3 characters long"),
  category: z.string().min(3, "Category must be atleast 3 characters long"),
  brand: z.string().min(3, "Brand must be atleast 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be atleast 3 characters long"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Atleast one image is required"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: priceFormat,
});

//Schema for updating products
export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, "Product Id is required"),
});

//Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});

//Schema for signing up users
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be atleast 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be atleast 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

//Cart Schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product Id is required"),
  name: z.string().min(1, "Name must be atleast 3 characters long"),
  slug: z.string().min(1, "Slug must be atleast 3 characters long"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "Image is required"),
  price: priceFormat,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: priceFormat,
  totalPrice: priceFormat,
  shippingPrice: priceFormat,
  taxPrice: priceFormat,
  sessionCartId: z.string().min(1, "Session Cart Id is required"),
  userId: z.string().optional().nullable(),
});

//Schema for shipping address
export const shippingAddressSchema = z.object({
  fullName: z.string().min(5, "Full Name must be atleast 5 characters long"),
  streetAddress: z
    .string()
    .min(3, "Street Address must be atleast 5 characters long"),
  city: z.string().min(3, "City must be atleast 3 characters long"),
  postalCode: z
    .string()
    .min(3, "Postal Code must be atleast 3 characters long"),
  country: z.string().min(3, "Country must be atleast 3 characters long"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

//Schema for payment methods
export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "Invalid payment method",
  });

//Schema for inserting order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User Id is required"),
  itemsPrice: priceFormat,
  shippingPrice: priceFormat,
  taxPrice: priceFormat,
  totalPrice: priceFormat,
  paymentMethod: z
    .string()
    .refine((data) => PAYMENT_METHODS.includes(data), "Invalid Payment Method"),
  shippingAddress: shippingAddressSchema,
});

//Schema for inserting order item
export const insertOrderItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  qty: z.number(),
  image: z.string(),
  price: priceFormat,
  slug: z.string(),
});

//Schema for payment result
export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: priceFormat,
});

//Schema for updating user profile
export const updateUserProfileSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters long"),
  email: z.string().email("Invalid email address"),
});

//Schema for updating user
export const updateUserSchema = updateUserProfileSchema.extend({
  id: z.string().min(1, "User Id is required"),
  role: z.string().min(1, "User Id is required"),
});

//Schema to insert reviews
export const insertReviewSchema = z.object({
  title: z.string().min(3, "Title must be atleast 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be atleast 3 characters long"),
  productId: z.string().min(1, "Product Id is required"),
  userId: z.string().min(1, "User Id is required"),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be atleast 1")
    .max(5, "Rating must be atmost 5"),
});
