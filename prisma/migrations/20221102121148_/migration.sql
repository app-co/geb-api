/*
  Warnings:

  - You are about to drop the `Avatr` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Avatr" DROP CONSTRAINT "Avatr_fk_user_fkey";

-- DropTable
DROP TABLE "Avatr";

-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "fk_user" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avatar.fk_user_unique" ON "Avatar"("fk_user");

-- AddForeignKey
ALTER TABLE "Avatar" ADD FOREIGN KEY ("fk_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
