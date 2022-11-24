/*
  Warnings:

  - You are about to drop the column `refreash_token` on the `User` table. All the data in the column will be lost.
  - Added the required column `refresh_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreash_token",
ADD COLUMN     "refresh_token" TEXT NOT NULL;
