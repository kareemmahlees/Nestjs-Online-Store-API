/*
  Warnings:

  - Added the required column `refreash_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreash_token" TEXT NOT NULL;
