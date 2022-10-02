-- AlterTable
ALTER TABLE "Presenca" ADD COLUMN     "presenca" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "OrderTransaction" (
    "id" TEXT NOT NULL,
    "consumidor_name" TEXT,
    "consumidor_id" TEXT NOT NULL,
    "prestador_id" TEXT NOT NULL,
    "prestador_name" TEXT,
    "valor" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
