"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRespository = void 0;

var _client = require("@prisma/client");

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class UsersRespository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data, apadrinhado, firstLogin, inativo, qntIndication, qntPadrinho) {
    const user = await this.prisma.user.create({
      data: {
        nome: data.nome,
        membro: data.membro,
        adm: data.adm,
        senha: data.senha,
        situation: {
          create: {
            apadrinhado,
            firstLogin,
            inativo
          }
        },
        region: {
          create: {
            city: 'BOTUCATU'
          }
        },
        dadosFire: {
          create: {
            qntIdication: qntIndication,
            qntPadrinho
          }
        },
        profile: {
          create: {
            whats: 'whats',
            workName: 'workName',
            CNPJ: 'CNPJ',
            CPF: 'CPF',
            ramo: 'ramo',
            enquadramento: 'enquadramento',
            email: 'email'
          }
        }
      }
    });
    return user;
  }

  async findByMembro(membro) {
    const find = await this.prisma.user.findUnique({
      where: {
        membro
      }
    });
    return find;
  }

  async findById(user_id) {
    const find = await this.prisma.user.findUnique({
      where: {
        id: user_id
      },
      include: {
        profile: true,
        region: true,
        situation: true
      }
    });
    return find;
  }

  async listAllUser() {
    const find = await this.prisma.user.findMany({
      include: {
        situation: true,
        profile: true,
        region: true,
        dadosFire: true
      }
    });
    return find;
  }

  async updateToken(id, token) {
    const up = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        token
      }
    });
    return up;
  }

  async deleteUser(membro) {
    const user = await this.prisma.user.delete({
      where: {
        membro
      }
    });
    return user;
  } //! !  LINKS


  async createLink(data) {
    const cr = await this.prisma.links.create({
      data: {
        user_id: data.user_id,
        link: data.link,
        nome: data.nome
      }
    });
    return cr;
  }

  async findLinkByUserId(user_id) {
    const fin = await this.prisma.links.findMany({
      where: {
        user_id
      }
    });
    return fin;
  }

  async updateLink(id, link) {
    const up = await this.prisma.links.update({
      where: {
        id
      },
      data: {
        link
      }
    });
    return up;
  }

  async deleteLink(id) {
    await this.prisma.links.delete({
      where: {
        id
      }
    });
  } // !!PROFILE  */


  async updateProfile(data) {
    const up = await this.prisma.profile.update({
      where: {
        id: data.id
      },
      data: {
        whats: data.whats,
        workName: data.workName,
        CNPJ: data.CNPJ,
        CPF: data.CPF,
        ramo: data.ramo,
        enquadramento: data.enquadramento,
        email: data.email,
        avatar: data.avatar,
        logotipo: data.logo,
        avatarPath: data.avatarPath,
        logoPath: data.logoPath
      }
    });
    return up;
  }

  async findByIdProfile(id) {
    const find = await this.prisma.profile.findFirst({
      where: {
        fk_id_user: id
      }
    });
    return find;
  }

  async createProfile(data) {
    const create = await this.prisma.profile.create({
      data: {
        whats: data.whats,
        workName: data.workName,
        CNPJ: data.CNPJ,
        CPF: data.CPF,
        ramo: data.ramo,
        enquadramento: data.enquadramento,
        email: data.email,
        logotipo: data.logo,
        avatar: data.avatar,
        fk_id_user: data.fk_id_user
      }
    });
    return create;
  }

  async findProfileByUserId(fk_id_user) {
    const find = await this.prisma.profile.findFirst({
      where: {
        fk_id_user
      }
    });
    return find;
  }

  async findAllProfile() {
    const fi = await this.prisma.profile.findMany();
    return fi;
  }

  async updateSenha(senha, membro) {
    const user = await this.prisma.user.update({
      where: {
        membro
      },
      data: {
        senha
      }
    });
    return user;
  }

  async updateUser(data, id) {
    const up = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        nome: data.nome,
        membro: data.membro,
        adm: data.adm,
        senha: data.senha
      }
    });
    return up;
  } // !! SITUATION


  async updateSituation(data) {
    const up = await this.prisma.situationUser.update({
      where: {
        id: data.id
      },
      data: {
        fk_id_user: data.fk_id_user,
        apadrinhado: data.apadrinhado,
        firstLogin: data.firstLogin,
        inativo: data.inativo
      }
    });
    return up;
  }

  async findSituation(id) {
    const fin = await this.prisma.situationUser.findFirst({
      where: {
        fk_id_user: id
      }
    });
    return fin;
  }

  async listAllSituation() {
    const l = await this.prisma.situationUser.findMany();
    return l;
  } // !! PADRINHO


  async createPadrinho(data) {
    const cre = await this.prisma.padrinho.create({
      data: {
        apadrinhado_id: data.apadrinhado_id,
        apadrinhado_name: data.apadrinhado_name,
        user_id: data.user_id,
        qnt: data.qnt
      }
    });
    return cre;
  }

  async findPadrinhoById(id) {
    const find = await this.prisma.padrinho.findUnique({
      where: {
        id
      }
    });
    return find;
  }

  async findPadrinhoByUserId(user_id) {
    const find = await this.prisma.padrinho.findFirst({
      where: {
        user_id
      }
    });
    return find;
  }

  async listAllPadrinho() {
    const all = await this.prisma.padrinho.findMany();
    return all;
  }

  async deletePadrinho(id) {
    await this.prisma.padrinho.delete({
      where: {
        id
      }
    });
  } //! ! DADOS FIRE


  async listAllDataFire() {
    const fire = this.prisma.dadosFire.findMany();
    return fire;
  }

}

exports.UsersRespository = UsersRespository;