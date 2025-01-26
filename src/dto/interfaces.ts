import { TRelationships, TUser } from "./types";

export interface IUser extends TUser {
  profile: IProfile
  Stars: IStars[]
  midia: IMidia[]
  created_at: string | Date
  updated_at: string | Date
}

export interface IProfile {
  id: string
  whats: string
  logotipo: string
  avatar: string
  workName: string
  CNPJ: string
  CPF: string
  ramo: string
  enquadramento: string
  email: string
  avatarPath: string
  logoPath: string
  created_at: string | Date
  updated_at: string | Date
  userId: string
}

interface IMidia {
  id: number
  user_id: string
  nome: string
  link: string
  created_at: string | Date
  updated_at: string | Date
  mida_type: number
}

export interface IStars {
  userId: string
  star: number
  created_at: string | Date
  updated_at: string | Date
}
export interface IRelationship {
  "objto": any,
  "userId": string
  "avatar": string
  "userReceptorId": string
  "created_at": string
  "updated_at": string
  "type_str": string
  "status": number
  "id": number
  "hub": number
  "type": number
  "valor": number
}