-- CreateTable
CREATE TABLE "Avatr" (
    "id" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "fk_user" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avatr.fk_user_unique" ON "Avatr"("fk_user");

-- AddForeignKey
ALTER TABLE "Avatr" ADD FOREIGN KEY ("fk_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
