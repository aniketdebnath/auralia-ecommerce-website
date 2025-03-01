import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//Convert to noraml object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

//Format number with decimal places
export function formatNumberWithDecimals(num: number): string {
  if (isNaN(num) || !isFinite(num)) return "0.00";
  return num.toFixed(2);
}

//Format errors
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error.name === "ZodError") {
    //Zod Error handling
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );
    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    //Prisma Error handling
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    //Generic Error handling
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error);
  }
}

//Round number to 2 decimal place
export function round2(value: number | string) {
  if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Invalid value type");
  }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-AU", {
  currency: "AUD",
  style: "currency",
  minimumFractionDigits: 2,
});

//Format currency
export function formatCurrency(value: number | string | null) {
  if (typeof value === "number") {
    return CURRENCY_FORMATTER.format(value);
  } else if (typeof value === "string") {
    return CURRENCY_FORMATTER.format(Number(value));
  } else return NaN;
}
