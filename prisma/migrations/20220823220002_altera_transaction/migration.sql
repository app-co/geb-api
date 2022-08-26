/*
  Warnings:

  - You are about to drop the column `nome` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `consumidor_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prestador_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `valor` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "nome",
ADD COLUMN     "consumidor_name" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "prestador_name" TEXT NOT NULL,
DROP COLUMN "valor",
ADD COLUMN     "valor" INTEGER NOT NULL;
