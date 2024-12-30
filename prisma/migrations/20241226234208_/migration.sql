/*
  Warnings:

  - The primary key for the `Stars` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Stars` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updated_at` to the `Stars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stars" DROP CONSTRAINT "Stars_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Stars_pkey" PRIMARY KEY ("id");
