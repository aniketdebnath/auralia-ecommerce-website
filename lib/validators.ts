import { z } from "zod";
import { formatNumberWithDecimals } from "./utils";

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
