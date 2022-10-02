-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "membro" TEXT NOT NULL,
    "token" TEXT,
    "senha" TEXT NOT NULL,
    "adm" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "whats" TEXT NOT NULL,
    "logotipo" TEXT,
    "avatar" TEXT,
    "workName" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "ramo" TEXT NOT NULL,
    "enquadramento" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SituationUser" (
    "id" TEXT NOT NULL,
    "inativo" BOOLEAN NOT NULL DEFAULT false,
    "firstLogin" BOOLEAN NOT NULL DEFAULT false,
    "apadrinhado" BOOLEAN NOT NULL DEFAULT false,
    "logado" BOOLEAN NOT NULL DEFAULT false,
    "fk_id_user" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "city" TEXT DEFAULT E'BOTUCATU',
    "fk_id_user" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_id_user" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "fk_id_post" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Padrinho" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "apadrinhado_name" TEXT NOT NULL,
    "apadrinhado_id" TEXT NOT NULL,
    "qnt" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presenca" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "presenca" BOOLEAN NOT NULL DEFAULT false,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderPresenca" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feed" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderTransaction" (
    "id" TEXT NOT NULL,
    "consumidor_name" TEXT NOT NULL,
    "consumidor_id" TEXT NOT NULL,
    "prestador_id" TEXT NOT NULL,
    "prestador_name" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consumo" (
    "id" TEXT NOT NULL,
    "consumidor_id" TEXT,
    "presstador_id" TEXT,
    "type" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "consumidor_name" TEXT,
    "consumidor_id" TEXT,
    "prestador_id" TEXT,
    "prestador_name" TEXT,
    "valor" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pontos" (
    "id" TEXT NOT NULL,
    "presenca" INTEGER NOT NULL DEFAULT 0,
    "padrinho" INTEGER NOT NULL DEFAULT 0,
    "compra" INTEGER NOT NULL DEFAULT 0,
    "venda" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "B2b" (
    "id" TEXT NOT NULL,
    "send_id" TEXT NOT NULL,
    "send_name" TEXT NOT NULL,
    "recevid_name" TEXT NOT NULL,
    "recevid_id" TEXT NOT NULL,
    "assunto" TEXT NOT NULL,
    "appointment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validate" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Indication" (
    "id" TEXT NOT NULL,
    "indicado_id" TEXT NOT NULL,
    "indicado_name" TEXT NOT NULL,
    "quemIndicou_id" TEXT NOT NULL,
    "quemIndicou_name" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "phone_number_client" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validate" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.membro_unique" ON "User"("membro");

-- CreateIndex
CREATE UNIQUE INDEX "Profile.fk_id_user_unique" ON "Profile"("fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "SituationUser.fk_id_user_unique" ON "SituationUser"("fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Region.fk_id_user_unique" ON "Region"("fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Like.fk_id_post_unique" ON "Like"("fk_id_post");

-- CreateIndex
CREATE UNIQUE INDEX "Padrinho.apadrinhado_id_unique" ON "Padrinho"("apadrinhado_id");

-- CreateIndex
CREATE UNIQUE INDEX "Links.user_id_unique" ON "Links"("user_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD FOREIGN KEY ("fk_id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SituationUser" ADD FOREIGN KEY ("fk_id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Region" ADD FOREIGN KEY ("fk_id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("fk_id_post") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
