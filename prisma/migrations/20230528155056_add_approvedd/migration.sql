/*
  Warnings:

  - Added the required column `approved` to the `Convidado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Convidado" ADD COLUMN     "approved" BOOLEAN NOT NULL;
