/*
  Warnings:

  - Added the required column `descricao` to the `Consumo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `Consumo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consumo" ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "valor" TEXT NOT NULL;
