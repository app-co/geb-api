/*
  Warnings:

  - You are about to drop the column `apointment` on the `B2b` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "B2b" DROP COLUMN "apointment",
ADD COLUMN     "appointment" TEXT;
