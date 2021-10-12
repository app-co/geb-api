/*
  Warnings:

  - You are about to drop the column `user_id` on the `Consumo` table. All the data in the column will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `consumidor_id` to the `Consumo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `presstador_id` to the `Consumo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Consumo" DROP CONSTRAINT "Consumo_user_id_fkey";

-- AlterTable
ALTER TABLE "Consumo" DROP COLUMN "user_id",
ADD COLUMN     "consumidor_id" TEXT NOT NULL,
ADD COLUMN     "presstador_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Like";

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "prestador_id" TEXT NOT NULL,
    "consumidor_id" TEXT NOT NULL,
    "valor" INTEGER NOT NULL DEFAULT 0,
    "descricao" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Consumo" ADD FOREIGN KEY ("consumidor_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
