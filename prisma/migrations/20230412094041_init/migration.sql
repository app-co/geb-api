-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "membro" TEXT NOT NULL,
    "token" TEXT,
    "senha" TEXT,
    "adm" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "whats" TEXT,
    "logotipo" TEXT,
    "avatar" TEXT,
    "workName" TEXT,
    "CNPJ" TEXT,
    "CPF" TEXT,
    "ramo" TEXT,
    "enquadramento" TEXT,
    "email" TEXT,
    "avatarPath" TEXT,
    "logoPath" TEXT,
    "fk_id_user" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SituationUser" (
    "id" TEXT NOT NULL,
    "inativo" BOOLEAN NOT NULL DEFAULT false,
    "firstLogin" BOOLEAN NOT NULL DEFAULT false,
    "apadrinhado" BOOLEAN NOT NULL DEFAULT false,
    "logado" BOOLEAN NOT NULL DEFAULT false,
    "fk_id_user" TEXT NOT NULL,

    CONSTRAINT "SituationUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "city" TEXT DEFAULT 'BOTUCATU',
    "fk_id_user" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_id_user" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "fk_id_post" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Padrinho" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "apadrinhado_name" TEXT NOT NULL,
    "apadrinhado_id" TEXT NOT NULL,
    "qnt" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Padrinho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presenca" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "presenca" BOOLEAN NOT NULL DEFAULT false,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Presenca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderPresenca" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderPresenca_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "OrderTransaction_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "Consumo_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pontos" (
    "id" TEXT NOT NULL,
    "presenca" INTEGER NOT NULL DEFAULT 0,
    "padrinho" INTEGER NOT NULL DEFAULT 0,
    "compra" INTEGER NOT NULL DEFAULT 0,
    "venda" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Pontos_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "B2b_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "Indication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DadosFire" (
    "fk_id_user" TEXT NOT NULL,
    "qntIdication" INTEGER DEFAULT 0,
    "qntPadrinho" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "Stars" (
    "id" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    "star" INTEGER NOT NULL DEFAULT 0,
    "valiador" TEXT NOT NULL,

    CONSTRAINT "Stars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Convidado" (
    "id" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,
    "name_convidado" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Convidado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_membro_key" ON "User"("membro");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_fk_id_user_key" ON "Profile"("fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "SituationUser_fk_id_user_key" ON "SituationUser"("fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Region_fk_id_user_key" ON "Region"("fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Links_user_id_key" ON "Links"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "DadosFire_fk_id_user_key" ON "DadosFire"("fk_id_user");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SituationUser" ADD CONSTRAINT "SituationUser_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_fk_id_post_fkey" FOREIGN KEY ("fk_id_post") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Padrinho" ADD CONSTRAINT "Padrinho_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosFire" ADD CONSTRAINT "DadosFire_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stars" ADD CONSTRAINT "Stars_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Convidado" ADD CONSTRAINT "Convidado_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
