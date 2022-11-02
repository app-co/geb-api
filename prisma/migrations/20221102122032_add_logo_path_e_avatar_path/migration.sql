/*
  Warnings:

  - You are about to drop the `Avatar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Logo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_fk_user_fkey";

-- DropForeignKey
ALTER TABLE "Logo" DROP CONSTRAINT "Logo_fk_user_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatarPath" TEXT,
ADD COLUMN     "logoPath" TEXT;

-- DropTable
DROP TABLE "Avatar";

-- DropTable
DROP TABLE "Logo";
