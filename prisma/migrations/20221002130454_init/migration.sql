-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_fk_id_post_fkey";

-- DropForeignKey
ALTER TABLE "SituationUser" DROP CONSTRAINT "SituationUser_fk_id_user_fkey";

-- AddForeignKey
ALTER TABLE "SituationUser" ADD FOREIGN KEY ("fk_id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("fk_id_post") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
