-- DropForeignKey
ALTER TABLE "DadosFire" DROP CONSTRAINT "DadosFire_fk_id_user_fkey";

-- DropForeignKey
ALTER TABLE "SituationUser" DROP CONSTRAINT "SituationUser_fk_id_user_fkey";

-- AddForeignKey
ALTER TABLE "SituationUser" ADD FOREIGN KEY ("fk_id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosFire" ADD FOREIGN KEY ("fk_id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
