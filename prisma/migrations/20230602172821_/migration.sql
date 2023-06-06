-- CreateTable
CREATE TABLE "Donate" (
    "id" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "itens" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donate_pkey" PRIMARY KEY ("id")
);
