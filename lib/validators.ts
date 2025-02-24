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
