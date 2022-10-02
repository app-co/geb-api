/*
  Warnings:

  - Made the column `consumidor_name` on table `OrderTransaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `consumidor_id` on table `OrderTransaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prestador_id` on table `OrderTransaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prestador_name` on table `OrderTransaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrderTransaction" ALTER COLUMN "consumidor_name" SET NOT NULL,
ALTER COLUMN "consumidor_id" SET NOT NULL,
ALTER COLUMN "prestador_id" SET NOT NULL,
ALTER COLUMN "prestador_name" SET NOT NULL;
