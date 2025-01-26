import { z } from "zod";

export const validation = {
  user: z.object({
    id: z.string(),
    nome: z.string(),
    apelido: z.string(),
    token: z.string().optional(),
    senha: z.string().optional().nullable(),
    adm: z.boolean().default(false),
    apadrinhado: z.boolean(),
    hub: z.array(z.number().default(0)),
  }),
  profile: z.object({
    id: z.string({ message: '* campo obrigatório' }).optional(),
    logotipo: z.string({ message: '* campo obrigatório' }).optional(),
    whats: z.string({ message: '* campo obrigatório' }),
    avatar: z.string({ message: '* campo obrigatório' }).optional(),
    workName: z.string({ message: '* campo obrigatório' }),
    CNPJ: z.string().optional().nullable(),
    CPF: z.string().optional().nullable(),
    ramo: z.string().optional().nullable(),
    enquadramento: z.string().optional().nullable(),
    email: z.string({ message: '* campo obrigatório' }).email('E-mail invaálido'),
    userId: z.string({ message: '* campo obrigatório' })
  }),
  midia: z.object({
    id: z.number(),
    link: z.string(),
    user_id: z.string(),
  }),
  relationships: z.object({
    id: z.number(),
    status: z.number().default(0),
    userId: z.string(),
    avatar: z.string(),
    userReceptorId: z.string().optional(),
    hub: z.number().default(0),
    type: z.number(),
    valor: z.number().default(0),
    objeto: z.any({}).optional()
  }),
  indication: z.object({
    indicado_por: z.string(),
    nomeCliente: z.string(),
    contatoCliente: z.string(),
  }),
  donate: z.array(z.object({
    item: z.string(),
    ponto: z.number(),
  })),
  invit: z.object({
    nomeConvidado: z.string(),
  }),
  session: z.object({
    apelido: z.string(),
    senha: z.string(),
  }),
  usersByHub: z.object({
    hub: z.string().transform(h => {
      return h.split(',').map(Number)
    }),
    pageSize: z.string().transform(h => Number(h)),
    pageNumber: z.string().transform(h => Number(h)),
    nome: z.string(),
    userId: z.string()
  })
}
