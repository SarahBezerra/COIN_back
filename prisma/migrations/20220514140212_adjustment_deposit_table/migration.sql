/*
  Warnings:

  - Made the column `title` on table `deposits` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `deposits` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "deposits" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
