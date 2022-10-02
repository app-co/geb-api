/*
  Warnings:

  - You are about to drop the column `indicado` on the `Indication` table. All the data in the column will be lost.
  - You are about to drop the column `quemIndicou` on the `Indication` table. All the data in the column will be lost.
  - Added the required column `indicado_id` to the `Indication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quemIndicou_id` to the `Indication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Indication" DROP COLUMN "indicado",
DROP COLUMN "quemIndicou",
ADD COLUMN     "indicado_id" TEXT NOT NULL,
ADD COLUMN     "quemIndicou_id" TEXT NOT NULL;
