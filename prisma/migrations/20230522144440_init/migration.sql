-- DropForeignKey
ALTER TABLE "Links" DROP CONSTRAINT "Links_user_id_fkey";

-- CreateTable
CREATE TABLE "midia" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,

    CONSTRAINT "midia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "midia" ADD CONSTRAINT "midia_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
