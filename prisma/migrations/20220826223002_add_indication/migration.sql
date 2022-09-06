-- CreateTable
CREATE TABLE "Indication" (
    "id" TEXT NOT NULL,
    "indicado" TEXT NOT NULL,
    "indicado_name" TEXT NOT NULL,
    "quemIndicou" TEXT NOT NULL,
    "quemIndicou_name" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "phone_number_client" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
