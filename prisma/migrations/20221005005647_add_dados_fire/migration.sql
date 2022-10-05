-- CreateTable
CREATE TABLE "DadosFire" (
    "fk_id_user" TEXT NOT NULL,
    "qntIdication" INTEGER NOT NULL DEFAULT 0,
    "qntPadrinho" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "DadosFire.fk_id_user_unique" ON "DadosFire"("fk_id_user");
