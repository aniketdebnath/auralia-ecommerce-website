"use server";

import { prisma } from "@/db/prisma";
import { insertReviewSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { formatError } from "../utils";
import { auth } from "@/auth";
import { z } from "zod";

//Create and update reviews
export async function createAndUpdateReview(
  data: z.infer<typeof insertReviewSchema>
) {
  try {
    const session = await auth();
    if (!session) throw new Error("User is not authenticated");
    //Validate and store the review

    const review = insertReviewSchema.parse({
      ...data,
      userId: session?.user?.id,
    });

    //Get product that is being reviewed
    const product = await prisma.product.findFirst({
      where: { id: review.productId },
    });

    if (!product) throw new Error("Product not found");

    //Check if user has already reviewed the product
    const existingReview = await prisma.review.findFirst({
      where: {
        productId: review.productId,
        userId: review.userId,
      },
    });

    await prisma.$transaction(async (tx) => {
      if (existingReview) {
        //Update the review
        await tx.review.update({
          where: { id: existingReview.id },
          data: {
            title: review.title,
            description: review.description,
            rating: review.rating,
          },
        });
      } else {
        //Create the review}
        await tx.review.create({
          data: review,
        });
      }
      //Get average rating of the product
      const averageRating = await tx.review.aggregate({
        _avg: { rating: true },
        where: { productId: review.productId },
      });
      //Get the number of reviews
      const reviewCount = await tx.review.count({
        where: { productId: review.productId },
      });

      //Update the product rating and review count
      await tx.product.update({
        where: { id: review.productId },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews: reviewCount,
        },
      });
    });
    revalidatePath(`/product/${product.slug}`);
    return { success: true, message: "Review updated successfully" };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

//Get all reviews for a product
export async function getReviews({ productId }: { productId: string }) {
  const data = await prisma.review.findMany({
    where: { productId },
    include: {
      user: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return { data };
}

//Get a review written by current user
export async function getReviewByProductId({
  productId,
}: {
  productId: string;
}) {
  const session = await auth();
  if (!session) throw new Error("User is not authenticated");

  return await prisma.review.findFirst({
    where: {
      productId,
      userId: session?.user?.id,
    },
  });
}
