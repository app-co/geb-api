"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validation = void 0;
var _zod = require("zod");
const validation = exports.validation = {
  user: _zod.z.object({
    id: _zod.z.string(),
    nome: _zod.z.string(),
    apelido: _zod.z.string(),
    token: _zod.z.string().optional(),
    senha: _zod.z.string().optional().nullable(),
    adm: _zod.z.boolean().default(false),
    apadrinhado: _zod.z.boolean(),
    hub: _zod.z.array(_zod.z.number().default(0))
  }),
  profile: _zod.z.object({
    id: _zod.z.string({
      message: '* campo obrigatório'
    }).optional(),
    logotipo: _zod.z.string({
      message: '* campo obrigatório'
    }).optional(),
    whats: _zod.z.string({
      message: '* campo obrigatório'
    }),
    avatar: _zod.z.string({
      message: '* campo obrigatório'
    }).optional(),
    workName: _zod.z.string({
      message: '* campo obrigatório'
    }),
    CNPJ: _zod.z.string().optional().nullable(),
    CPF: _zod.z.string().optional().nullable(),
    ramo: _zod.z.string().optional().nullable(),
    enquadramento: _zod.z.string().optional().nullable(),
    email: _zod.z.string({
      message: '* campo obrigatório'
    }).email('E-mail invaálido'),
    userId: _zod.z.string({
      message: '* campo obrigatório'
    })
  }),
  midia: _zod.z.object({
    id: _zod.z.number(),
    nome: _zod.z.string(),
    link: _zod.z.string(),
    type_midia: _zod.z.string(),
    created_at: _zod.z.string(),
    updated_at: _zod.z.string(),
    user_id: _zod.z.string()
  }),
  relationships: _zod.z.object({
    id: _zod.z.number(),
    status: _zod.z.number().default(0),
    userId: _zod.z.string(),
    avatar: _zod.z.string(),
    userReceptorId: _zod.z.string().optional(),
    hub: _zod.z.number().default(0),
    type: _zod.z.number(),
    valor: _zod.z.number().default(0),
    objeto: _zod.z.any({}).optional()
  }),
  indication: _zod.z.object({
    indicado_por: _zod.z.string(),
    nomeCliente: _zod.z.string(),
    contatoCliente: _zod.z.string()
  }),
  donate: _zod.z.array(_zod.z.object({
    item: _zod.z.string(),
    ponto: _zod.z.number()
  })),
  invit: _zod.z.object({
    nomeConvidado: _zod.z.string()
  }),
  session: _zod.z.object({
    apelido: _zod.z.string(),
    senha: _zod.z.string()
  }),
  usersByHub: _zod.z.object({
    hub: _zod.z.string().transform(h => {
      return h.split(',').map(Number);
    }),
    pageSize: _zod.z.string().transform(h => Number(h)),
    pageNumber: _zod.z.string().transform(h => Number(h)),
    nome: _zod.z.string(),
    userId: _zod.z.string()
  })
};