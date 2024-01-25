-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_fk_id_post_fkey";

-- DropForeignKey
ALTER TABLE "Padrinho" DROP CONSTRAINT "Padrinho_user_id_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- AlterTable
ALTER TABLE "RelationShip" ADD COLUMN     "hub" "HUB" NOT NULL DEFAULT 'GEB';

-- CreateTable
CREATE TABLE "accumulated" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "accumulated_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_fk_id_post_fkey" FOREIGN KEY ("fk_id_post") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Padrinho" ADD CONSTRAINT "Padrinho_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
