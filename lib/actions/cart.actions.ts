"use server";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { formatError, round2 } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";
import { convertToPlainObject } from "../utils";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";

//Calculate cart prices
const calculatePrice = (items: CartItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = itemsPrice > 100 ? 0 : 10,
    taxPrice = round2(itemsPrice * 0.15),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    //Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    //Get session and user ID

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;
    //Get Cart
    const cart = await getMyCart();

    //Parse and validate cart item
    const item = cartItemSchema.parse(data);

    //find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) throw new Error("Product not found");

    if (!cart) {
      //Create new cart
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calculatePrice([item]),
      });
      //Add to database

      await prisma.cart.create({
        data: newCart as Prisma.CartCreateInput,
      });

      //Revalidate product page
      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: `${product.name} added to cart successfully`,
      };
    } else {
      //Check if item already exists in cart
      const existingItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );
      if (existingItem) {
        //Check stock
        if (product.stock < existingItem.qty + 1) {
          throw new Error("Product out of stock");
        }
        //Incerement quantity
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.qty = existingItem.qty + 1;
      } else {
        //Ckeck stock
        if (product.stock < 1) {
          throw new Error("Product out of stock");
        }
        //Add item to cart.items
        cart.items.push(item);
      }

      //Save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calculatePrice(cart.items as CartItem[]),
        },
      });
      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: `${product.name} added to cart successfully`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getMyCart() {
  // Check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart session not found");

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // Convert decimals and return
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    //Get product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");

    //Get cart
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    //Check if item exists in cart
    const existingItem = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );
    if (!existingItem) throw new Error("Product not found in cart");

    //Check if item qty is 1 or more
    if (existingItem.qty === 1) {
      //Remove item from cart
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== productId
      );
    } else {
      //Decrement item qty
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
        existingItem.qty - 1;
    }
    //Update database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calculatePrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);
    return {
      success: true,
      message: `${product.name} removed from cart successfully`,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
