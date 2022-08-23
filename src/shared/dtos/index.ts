export interface IUserDtos {
   id?: string;
   nome: string;
   membro: string;
   senha: string;
   adm: boolean;
   token?: string;
}

export interface IProfileDto {
   whats: string;
   workName: string;
   CNPJ: string;
   CPF: string;
   ramo: string;
   enquadramento: string;
   email: string;
   links?: [];
}

export interface IPresencaDto {
   id?: string;
   nome: string;
   user_id: string;
   createdAt?: Date;
}
