/*
  Warnings:

  - You are about to drop the column `imageur` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "imageur",
ADD COLUMN     "imageurl" TEXT NOT NULL DEFAULT '';
