/*
  Warnings:

  - You are about to drop the `DadosFire` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DadosFire" DROP CONSTRAINT "DadosFire_fk_id_user_fkey";

-- DropTable
DROP TABLE "DadosFire";

-- CreateTable
CREATE TABLE "Stars" (
    "id" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    "star" INTEGER NOT NULL DEFAULT 0,
    "valiador" TEXT NOT NULL,

    CONSTRAINT "Stars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stars_fk_id_user_key" ON "Stars"("fk_id_user");

-- AddForeignKey
ALTER TABLE "Stars" ADD CONSTRAINT "Stars_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Links.user_id_unique" RENAME TO "Links_user_id_key";

-- RenameIndex
ALTER INDEX "Profile.fk_id_user_unique" RENAME TO "Profile_fk_id_user_key";

-- RenameIndex
ALTER INDEX "Region.fk_id_user_unique" RENAME TO "Region_fk_id_user_key";

-- RenameIndex
ALTER INDEX "SituationUser.fk_id_user_unique" RENAME TO "SituationUser_fk_id_user_key";

-- RenameIndex
ALTER INDEX "User.membro_unique" RENAME TO "User_membro_key";
