-- CreateTable
CREATE TABLE "Logo" (
    "id" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "fk_user" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Logo.fk_user_unique" ON "Logo"("fk_user");

-- AddForeignKey
ALTER TABLE "Logo" ADD FOREIGN KEY ("fk_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
