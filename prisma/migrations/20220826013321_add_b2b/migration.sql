-- CreateTable
CREATE TABLE "B2b" (
    "id" TEXT NOT NULL,
    "send_id" TEXT NOT NULL,
    "send_name" TEXT NOT NULL,
    "recevid_name" TEXT NOT NULL,
    "recevid_id" TEXT NOT NULL,
    "apointment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
