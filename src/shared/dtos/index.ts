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

export interface IOrderTransaction {
   id?: string;
   consumidor_name: string;
   prestador_name: string;
   consumidor_id: string;

   prestador_id: string;
   valor: number;
   descricao: string;
   createdAt?: Date;
}
