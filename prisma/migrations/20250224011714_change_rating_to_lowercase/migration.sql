/*
  Warnings:

  - You are about to drop the column `Rating` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Rating",
ADD COLUMN     "rating" DECIMAL(3,2) NOT NULL DEFAULT 0;
