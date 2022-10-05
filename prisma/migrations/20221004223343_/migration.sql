/*
  Warnings:

  - You are about to drop the column `qnt` on the `Indication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Indication" DROP COLUMN "qnt";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "qntIndication" INTEGER DEFAULT 0;
