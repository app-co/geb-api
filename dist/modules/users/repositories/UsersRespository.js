"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRespository = void 0;

var _prisma = require("../../../utils/prisma");

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class UsersRespository {
  async create(data, apadrinhado, firstLogin, inativo) {
    const user = await _prisma.prisma.user.create({
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

  async updateMembro(data) {
    const us = _prisma.prisma.user.update({
      where: {
        id: data.id
      },
      data: {
        nome: data.nome,
        membro: data.membro,
        senha: data.senha,
        adm: data.adm,
        token: data.token
      }
    });

    return us;
  }

  async findByMembro(membro) {
    const find = await _prisma.prisma.user.findUnique({
      where: {
        membro
      }
    });
    return find;
  }

  async findById(user_id) {
    const find = await _prisma.prisma.user.findUnique({
      where: {
        id: user_id
      },
      include: {
        profile: true,
        region: true,
        situation: true,
        Stars: true,
        midia: true
      }
    });
    return find;
  }

  async listAllUser() {
    const find = await _prisma.prisma.user.findMany({
      include: {
        situation: true,
        profile: true,
        region: true,
        DadosFire: true,
        Stars: true,
        midia: true,
        Convidados: true
      }
    });
    return find;
  }

  async updateToken(id, token) {
    const up = await _prisma.prisma.user.update({
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
    const user = await _prisma.prisma.user.delete({
      where: {
        membro
      }
    });
    return user;
  } //! !  LINKS
  // !!PROFILE  */


  async updateProfile(data) {
    const up = await _prisma.prisma.profile.update({
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
    const find = await _prisma.prisma.profile.findFirst({
      where: {
        fk_id_user: id
      }
    });
    return find;
  }

  async createProfile(data) {
    const create = await _prisma.prisma.profile.create({
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
    const find = await _prisma.prisma.profile.findFirst({
      where: {
        fk_id_user
      }
    });
    return find;
  }

  async findAllProfile() {
    const fi = await _prisma.prisma.profile.findMany();
    return fi;
  }

  async updateSenha(senha, membro) {
    const user = await _prisma.prisma.user.update({
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
    const up = await _prisma.prisma.user.update({
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
    const up = await _prisma.prisma.situationUser.update({
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
    const fin = await _prisma.prisma.situationUser.findFirst({
      where: {
        fk_id_user: id
      }
    });
    return fin;
  }

  async listAllSituation() {
    const l = await _prisma.prisma.situationUser.findMany();
    return l;
  } // !! PADRINHO


  async createPadrinho(data) {
    const cre = await _prisma.prisma.padrinho.create({
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
    const find = await _prisma.prisma.padrinho.findUnique({
      where: {
        id
      }
    });
    return find;
  }

  async findPadrinhoByUserId(user_id) {
    const find = await _prisma.prisma.padrinho.findFirst({
      where: {
        user_id
      }
    });
    return find;
  }

  async listAllPadrinho() {
    const all = await _prisma.prisma.padrinho.findMany();
    return all;
  }

  async deletePadrinho(id) {
    await _prisma.prisma.padrinho.delete({
      where: {
        id
      }
    });
  } //! ! DADOS FIRE


  async listAllDataFire() {
    const fire = _prisma.prisma.dadosFire.findMany();

    return fire;
  }

}

exports.UsersRespository = UsersRespository;