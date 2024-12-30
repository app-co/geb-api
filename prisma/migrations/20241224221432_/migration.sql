-- CreateTable
CREATE TABLE "Stars" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "star" INTEGER NOT NULL DEFAULT 0,
    "valiador" TEXT NOT NULL,

    CONSTRAINT "Stars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stars" ADD CONSTRAINT "Stars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
