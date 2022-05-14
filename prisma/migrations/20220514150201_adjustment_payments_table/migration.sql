/*
  Warnings:

  - Made the column `title` on table `payments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `payments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
