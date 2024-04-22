/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Table` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dish" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "Dish" RENAME COLUMN "updatedAt" TO "updated_at";

-- AlterTable
ALTER TABLE "Order" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "Order" RENAME COLUMN "updatedAt" TO "updated_at";

-- AlterTable
ALTER TABLE "Table" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "Table" RENAME COLUMN "updatedAt" TO "updated_at";